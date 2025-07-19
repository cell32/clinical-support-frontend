
import { useState } from 'react';
import API from '../services/api';
import SuggestedTreatment from './SuggestedTreatment';

type Diagnosis = {
  diagnosis: string;
  confidence: string;
};

type DiagnosisResponse = {
  rules_based_diagnosis: Diagnosis[];
  ai_based_diagnosis: Diagnosis[];
  message?: string;
};

function SymptomForm() {
  const [symptoms, setSymptoms] = useState('');
  const [rulesResult, setRulesResult] = useState<Diagnosis[] | null>(null);
  const [aiResult, setAiResult] = useState<Diagnosis[] | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('/diagnosis', { text: symptoms });
      const data: DiagnosisResponse = response.data;

      setRulesResult(data.rules_based_diagnosis);
      setAiResult(data.ai_based_diagnosis);
      setNotice(data.message || null);
    } catch (error) {
      console.error(error);
      setRulesResult([{ diagnosis: "Error", confidence: "low" }]);
      setAiResult([{ diagnosis: "Error", confidence: "low" }]);
    }
  };

  // Decide which diagnosis list to use for treatment suggestion
  const diagnosisList = rulesResult ?? aiResult;

  return (
    <div style={{ padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <p style={{ fontStyle: 'italic'}}>Disclaimer: This is an experimental project and not intended for real medical diagnosis  --Have some fun!</p>
        <label style={{ fontWeight: 600, fontSize: '1rem' }}>
          Describe your symptoms in detail:
        </label>
        <textarea
          spellCheck={true}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. 'I have a headache and sore throat for two days.'"
          rows={4}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            resize: 'vertical',
            width: '100%',
            color: '#000'
          }}
          className="ghost-placeholder"
        />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Get Diagnosis
          </button>
          <button
            type="button"
            onClick={() => {
              setSymptoms('');
              setRulesResult(null);
              setAiResult(null);
              setNotice(null);
            }}
            style={{
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Clear Diagnosis
          </button>
        </div>
      </form>

      {rulesResult && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Rules-Based Diagnosis:</h3>
          <ul>
            {rulesResult.map((diag, index) => (
              <li key={index}>{diag.diagnosis} - Confidence: {diag.confidence}</li>
            ))}
          </ul>
        </div>
      )}

      {notice && (
        <div style={{ marginTop: '3rem', color: 'red', fontStyle: 'italic' }}>
          {notice}
        </div>
      )}

      {aiResult && (
        <div style={{ marginTop: '1rem' }}>
          <h3>AI-Based Diagnosis:</h3>
          <ul>
            {aiResult.map((diag, index) => (
              <li key={index}>{diag.diagnosis} - Confidence: {diag.confidence}</li>
            ))}
          </ul>
        </div>
      )}

      {diagnosisList && (
        <SuggestedTreatment diagnoses={diagnosisList.map(d => d.diagnosis)} />
      )}
    </div>
  );
}

export default SymptomForm;