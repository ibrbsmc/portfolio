import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

const vertexShader = `#version 300 es
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `#version 300 es
  precision highp float;
  uniform float uTime;
  uniform float uAmplitude;
  uniform vec3 uColorStops[3];
  uniform vec2 uResolution;
  uniform float uBlend;
  out vec4 fragColor;

  vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
  }

  float noise(vec2 value) {
    const vec4 constants = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 cell = floor(value + dot(value, constants.yy));
    vec2 local = value - cell + dot(cell, constants.xx);
    vec2 offset = local.x > local.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 points = local.xyxy + constants.xxzz;
    points.xy -= offset;
    cell = mod(cell, 289.0);
    vec3 permutation = permute(permute(cell.y + vec3(0.0, offset.y, 1.0)) + cell.x + vec3(0.0, offset.x, 1.0));
    vec3 weight = max(0.5 - vec3(dot(local, local), dot(points.xy, points.xy), dot(points.zw, points.zw)), 0.0);
    weight = weight * weight;
    weight = weight * weight;
    vec3 x = 2.0 * fract(permutation * constants.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 gradient = x - ox;
    weight *= 1.79284291400159 - 0.85373472095314 * (gradient * gradient + h * h);
    vec3 result;
    result.x = gradient.x * local.x + h.x * local.y;
    result.yz = gradient.yz * points.xz + h.yz * points.yw;
    return 130.0 * dot(weight, result);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec3 left = mix(uColorStops[0], uColorStops[1], smoothstep(0.0, 0.5, uv.x));
    vec3 color = mix(left, uColorStops[2], smoothstep(0.5, 1.0, uv.x));
    float height = noise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
    height = exp(height);
    height = uv.y * 2.0 - height + 0.2;
    float intensity = 0.6 * height;
    float alpha = smoothstep(0.20 - uBlend * 0.5, 0.20 + uBlend * 0.5, intensity);
    fragColor = vec4(intensity * color * alpha, alpha);
  }
`;

function Aurora({
  colorStops = ["#0891b2", "#2563eb", "#22d3ee"],
  amplitude = 1,
  blend = 0.5,
  speed = 1,
  className = "",
}) {
  const containerRef = useRef(null);
  const propsRef = useRef({ colorStops, amplitude, blend, speed });
  propsRef.current = { colorStops, amplitude, blend, speed };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    container.appendChild(gl.canvas);

    const toColors = (stops) => stops.map((hex) => {
      const color = new Color(hex);
      return [color.r, color.g, color.b];
    });
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: toColors(colorStops) },
        uResolution: { value: [1, 1] },
        uBlend: { value: blend },
      },
    });
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };

    let frameId;
    let visible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    const resizeObserver = new ResizeObserver(resize);
    visibilityObserver.observe(container);
    resizeObserver.observe(container);
    resize();

    const update = (time) => {
      frameId = requestAnimationFrame(update);
      if (!visible || document.hidden) return;
      const current = propsRef.current;
      program.uniforms.uTime.value = time * 0.001 * current.speed;
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uBlend.value = current.blend;
      program.uniforms.uColorStops.value = toColors(current.colorStops);
      renderer.render({ scene: mesh });
    };
    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className={`aurora-container ${className}`.trim()} />;
}

export default Aurora;
