'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/lib/store';
import { analyzeResume } from '@/lib/ai';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIResponse } from '@/lib/types';

export function ATSScorePanel() {
  const { resumeData, isAiProcessing, setIsAiProcessing, setPersonalInfo } = useResumeStore();
  const [analysis, setAnalysis] = useState<AIResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeHandler = async () => {
    setIsAnalyzing(true);
    setIsAiProcessing(true);
    try {
      const result = await analyzeResume(resumeData);
      setAnalysis(result);
    } finally {
      setIsAnalyzing(false);
      setIsAiProcessing(false);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const scoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-amber-500';
    if (score >= 40) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-red-600';
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          📊 ATS Score Checker
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={analyzeHandler}
          loading={isAnalyzing}
          className="text-xs"
        >
          {analysis ? 'Re-analyze' : 'Analyze Resume'}
        </Button>
      </div>

      {analysis && analysis.atsScore !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {/* Score Circle */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted opacity-20" />
                <circle
                  cx="40" cy="40" r="34" fill="none" strokeWidth="6"
                  className={scoreColor(analysis.atsScore)}
                  strokeDasharray={`${(analysis.atsScore / 100) * 213.6} 213.6`}
                  strokeLinecap="round"
                  style={{ stroke: 'currentColor' }}
                />
              </svg>
              <div className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${scoreColor(analysis.atsScore)}`}>
                {analysis.atsScore}
              </div>
            </div>
            <div>
              <p className={`text-sm font-semibold ${scoreColor(analysis.atsScore)}`}>
                {analysis.atsScore >= 80 ? 'Excellent' : analysis.atsScore >= 60 ? 'Good' : analysis.atsScore >= 40 ? 'Needs Work' : 'Poor'}
              </p>
              <p className="text-xs text-muted-foreground">ATS Compatibility Score</p>
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Suggestions:</p>
              <ul className="space-y-1.5">
                {analysis.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-yellow-500 mt-0.5 flex-shrink-0">💡</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Keywords */}
          {analysis.keywords && analysis.keywords.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Suggested Keywords:</p>
              <div className="flex flex-wrap gap-1">
                {analysis.keywords.map((kw) => (
                  <Badge key={kw} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    + {kw}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Apply AI Summary */}
          {analysis.improved && analysis.improved !== resumeData.personalInfo.summary && (
            <div className="bg-accent/30 rounded-lg p-3">
              <p className="text-xs font-semibold text-foreground mb-1">Improved Summary:</p>
              <p className="text-xs text-muted-foreground leading-relaxed italic">{analysis.improved}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs text-primary"
                onClick={() => setPersonalInfo({ summary: analysis.improved })}
              >
                ✨ Apply This Summary
              </Button>
            </div>
          )}
        </motion.div>
      )}

      {!analysis && (
        <p className="text-xs text-muted-foreground text-center py-4">
          Click &quot;Analyze Resume&quot; to get your ATS compatibility score and AI suggestions.
        </p>
      )}
    </Card>
  );
}
