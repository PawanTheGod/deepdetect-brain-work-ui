// DeepDetect Brain API Service - Real Backend Integration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface DetectionResult {
  // Primary verdict
  verdict: 'AI-GENERATED' | 'DEEPFAKE' | 'AUTHENTIC' | 'UNCERTAIN';
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  ai_generated: number;
  deepfake: number;

  // Layer 1 Analysis
  layer1: {
    identity_verdict: string;
    confidence: string;
    reasoning: string;
    xception_score: number;
    efficientnet_score: number;
    identity_type: string;
  };

  // Layer 2 Forensics
  layer2: {
    performed: boolean;
    classification?: string;
    severity?: string;
    weighted_score?: number;
    model_agreement?: string;
    detailed_analysis?: string;
    recommendation?: string;
    reason?: string;
  };

  // Detailed Analysis
  details: {
    models: {
      name: string;
      score: number;
      probability: number;
      signal: 'positive' | 'negative' | 'neutral';
      interpretation: string;
    }[];
    forensics: {
      name: string;
      status: 'detected' | 'not_detected' | 'inconclusive';
      description: string;
      details?: string;
    }[];
    forensic_summary: {
      total_tests: number;
      anomalies_detected: number;
    };
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
  };

  // Summary
  summary: {
    primary_finding: string;
    confidence_level: string;
    analysis_type: string;
    processing_time: string;
    recommendation: string;
  };

  // FINAL VERDICT (Engine Authority Decision)
  final_verdict: {
    ai_generated: 'YES' | 'NO' | 'UNKNOWN';
    confidence: string;
    reasoning: string;
    evidence_summary: string;
    engine_score?: number;
    recommendation: string;
  };
}

/**
 * Analyze an image using the DeepDetect Brain backend
 * @param file - Image file or URL to analyze
 * @returns Detection results from the backend
 */
export async function analyzeImage(file: File | string): Promise<DetectionResult> {
  const formData = new FormData();

  if (typeof file === 'string') {
    // For URL-based analysis (future feature)
    throw new Error('URL analysis not yet supported. Please upload an image file.');
  } else {
    formData.append('image', file);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Analysis failed with status ${response.status}`);
    }

    const result: DetectionResult = await response.json();
    return result;

  } catch (error) {
    console.error('API Error:', error);

    // If backend is not available, throw a user-friendly error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to detection service. Please ensure the backend server is running.');
    }

    throw error;
  }
}

/**
 * Check if the backend API is healthy and ready
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

/**
 * Get the status of all detection models
 */
export async function getModelsStatus(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/models/status`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models status');
    }

    return await response.json();
  } catch (error) {
    console.error('Models status check failed:', error);
    throw error;
  }
}


// Video analysis support removed per user request

