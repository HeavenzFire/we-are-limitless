
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  phi: number;
  pulse: number;
}

const SacredGeometry: React.FC<Props> = ({ phi, pulse }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const g = svg.append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    // Draw Flower of Life / Seed of Life patterns
    const radius = 100;
    const circles = 12;

    const drawPattern = (scale: number, opacity: number, color: string) => {
      for (let i = 0; i < circles; i++) {
        const angle = (i / circles) * Math.PI * 2;
        g.append("circle")
          .attr("cx", Math.cos(angle) * radius * scale)
          .attr("cy", Math.sin(angle) * radius * scale)
          .attr("r", radius * scale)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 0.5)
          .attr("opacity", opacity)
          .attr("class", "pattern-circle");
      }
    };

    drawPattern(phi, 0.4, "#d4af37"); // Gold
    drawPattern(phi * 0.618, 0.2, "#10b981"); // Emerald
    
    // Animate rotation
    const rotate = () => {
      g.transition()
        .duration(10000 / pulse)
        .ease(d3.easeLinear)
        .attr("transform", `translate(${centerX}, ${centerY}) rotate(360)`)
        .on("end", rotate);
    };
    
    rotate();

  }, [phi, pulse]);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center pointer-events-none">
      <svg 
        ref={svgRef} 
        viewBox="0 0 600 600" 
        className="w-full h-full max-w-2xl opacity-40 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
      />
    </div>
  );
};

export default SacredGeometry;
