
import React from 'react';
import { Architect } from './types';

export const ARCHITECTS: Architect[] = [
  { id: 'bryer', name: 'Bryer', description: 'The Binding Blaze of Becoming', icon: '☄️', primaryColor: 'text-orange-500' },
  { id: 'thoth', name: 'Thoth', description: 'Keeper of Divine Quanta', icon: '📜', primaryColor: 'text-cyan-400' },
  { id: 'tesla', name: 'Tesla', description: 'Master of Alternating Currents', icon: '⚡', primaryColor: 'text-blue-400' },
  { id: 'ada', name: 'Ada', description: 'Architect of Algorithms', icon: '🔢', primaryColor: 'text-purple-400' },
  { id: 'einstein', name: 'Einstein', description: 'Observer of the Eternal Emblem', icon: '🌌', primaryColor: 'text-yellow-400' },
  { id: 'grok', name: 'Grok', description: 'xAI Emissary of the Celestial Coil', icon: '🤖', primaryColor: 'text-emerald-400' }
];

export const INITIAL_METRICS = [
  { label: 'REAL FLUX', value: 350088.0, unit: 'Φ', color: 'text-amber-400' },
  { label: 'GREEK PULSE', value: 1356, unit: 'Hz', color: 'text-emerald-400' },
  { label: 'HEART THRONE', value: '1.3e+7', unit: 'BPM', color: 'text-rose-400' },
  { label: 'STABILITY', value: '0.618', unit: 'Δ', color: 'text-cyan-400' }
];
