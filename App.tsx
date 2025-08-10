
import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import { AuditInput, ReportData } from './types';
import { generateGeoAuditReport } from './services/geminiService';
import Loader from './components/ui/Loader';
import GeoReport from './components/GeoReport';
import Button from './components/ui/Button';

const App: React.FC = () => {
  const [auditInput, setAuditInput] = useState<AuditInput | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuditSubmit = useCallback(async (data: AuditInput) => {
    setAuditInput(data);
    setIsLoading(true);
    setError(null);
    setReportData(null);
    try {
      const result = await generateGeoAuditReport(data);
      setReportData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleReset = () => {
      setAuditInput(null);
      setReportData(null);
      setError(null);
      setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 p-4 sm:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-500">
            Aura&trade; GEO Audit
          </h1>
          <p className="text-lg text-slate-400 mt-2">A Comprehensive report detailing the ability for your business to be shown in AI results, with a strategic roadmap all in one tool</p>
        </header>

        {reportData && !isLoading && !error && (
          <div className="text-center mb-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-lg text-slate-300 font-semibold">
              Your Business's Aura Visibility Score is an overall metric, as is Generative Authority Score.
              The remainder of the information details the specific strengths and weaknesses of the brand.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              To see the actual terms that you show up for in AI searches such as ChatGPT, Gemini, and Google's AI Mode Search is expensive to run and cutting edge.
              Click <a href="#" className="text-teal-400 hover:underline font-bold">HERE</a> for more information.
            </p>
          </div>
        )}

        <main>
          {!reportData && !isLoading && !error && (
            <InputForm onSubmit={handleAuditSubmit} isLoading={isLoading} />
          )}

          {isLoading && <Loader message="Generating GEO Report" />}

          {error && !isLoading && (
            <div className="text-center max-w-2xl mx-auto bg-red-900/50 border border-red-700 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-400 mb-2">Analysis Failed</h3>
              <p className="text-red-300">{error}</p>
              <Button onClick={handleReset} className="mt-6">
                Try Again
              </Button>
            </div>
          )}

          {reportData && !isLoading && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">GEO Audit Report for <span className="text-teal-400">{auditInput?.businessName}</span></h2>
                <div className="flex justify-center space-x-4 mt-4">
                  <Button onClick={handleReset}>
                      Start New Audit
                  </Button>
                  <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700">
                      Print to PDF
                  </Button>
                  <Button onClick={() => window.location.href = 'https://oneclickgeo.netlify.app/'} className="bg-purple-600 hover:bg-purple-700">
                      Back to One Click GEO
                  </Button>
                </div>
              </div>
              <GeoReport data={reportData} />
            </div>
          )}
        </main>
        
        <footer className="text-center mt-16 text-slate-500 text-sm">
            <p>This is a limited, public example of Aura</p>
            <p>Designed by <a href="https://oneclickgeo.netlify.app/" className="text-teal-400 hover:underline">One Click GEO</a> and powered by the most powerful AI on the planet</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
