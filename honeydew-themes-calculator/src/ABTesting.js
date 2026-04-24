import React from 'react';
import { logEvent } from './Analytics';

export const getExperimentVariant = (experimentName) => {
  // Simple deterministic a/b assignment based on a mock user id or random
  const randomVariant = Math.random() > 0.5 ? 'A' : 'B';
  logEvent('experiment_enrolled', { experimentName, variant: randomVariant });
  return randomVariant;
};

export const Variant = ({ name, children, experimentName }) => {
  // In a real implementation this would check the assigned variant from context
  return <div data-variant={name}>{children}</div>;
};

function ABTesting() {
  return (
    <div>
      <h2>A/B Testing Infrastructure</h2>
      <p>Utilities for running experiments and tracking conversions.</p>
    </div>
  );
}

export default ABTesting;
