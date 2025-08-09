
import React, { useState } from 'react';
import { AuditInput } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';

interface InputFormProps {
  onSubmit: (data: AuditInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [domain, setDomain] = useState('example.com');
  const [businessName, setBusinessName] = useState('Example Corp');
  const [industryKeywords, setIndustryKeywords] = useState('SaaS, B2B software, project management');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ domain, businessName, industryKeywords });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-100">Start Your GEO Audit</h2>
        <p className="text-center text-slate-400">
          Enter your business details below to begin the AI-powered analysis of your online presence.
        </p>
        <Input
          label="Domain (e.g., example.com)"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
        />
        <Input
          label="Business Name (e.g., Example Corp)"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
        <Input
          label="Industry Keywords (comma-separated)"
          id="industryKeywords"
          value={industryKeywords}
          onChange={(e) => setIndustryKeywords(e.target.value)}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Analyzing...' : 'Generate Audit'}
        </Button>
      </form>
    </Card>
  );
};

export default InputForm;
