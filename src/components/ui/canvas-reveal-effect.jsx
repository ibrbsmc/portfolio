import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { cn } from "../../lib/utils";

function CanvasRevealEffect(
  {
    animationSpeed = 0.4,
    opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
    colors = [[0, 255, 255]],
    containerClassName = "",
    dotSize = 3,
    showGradient = true,
  }
) {
  return (
    <div className={cn("canvas-reveal-container", containerClassName)}>
      <DotMatrix
        colors={colors}
        dotSize={dotSize}
        opacities={opacities}
        shader={`
          float animation_speed_factor = ${animationSpeed.toFixed(1)};
          float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01
            + (random(st2) * 0.15);
          opacity *= step(intro_offset, u_time * animation_speed_factor);
          opacity *= clamp(
            (1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25,
            1.0,
            1.25
          );
        `}
      />
      {showGradient && <div className="canvas-reveal-gradient" aria-hidden="true" />}
    </div>
  );
}

function DotMatrix({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
}) {
  const uniforms = useMemo(() => {
    let palette = Array(6).fill(colors[0]);
    if (colors.length === 2) {
      palette = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    } else if (colors.length === 3) {
      palette = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
    }

    return {
      u_colors: {
        value: palette.map(([red, green, blue]) => [red / 255, green / 255, blue / 255]),
        type: "uniform3fv",
      },
      u_opacities: { value: opacities, type: "uniform1fv" },
      u_total_size: { value: totalSize, type: "uniform1f" },
      u_dot_size: { value: dotSize, type: "uniform1f" },
    };
  }, [colors, dotSize, opacities, totalSize]);

  return (
    <Shader
      uniforms={uniforms}
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        out vec4 fragColor;

        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
          return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }

        void main() {
          vec2 st = fragCoord.xy;
          st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
          st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

          float opacity = step(0.0, st.x) * step(0.0, st.y);
          vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

          float frequency = 5.0;
          float show_offset = random(st2);
          float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
          opacity *= u_opacities[int(rand * 10.0)];
          opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
          opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

          vec3 color = u_colors[int(show_offset * 6.0)];
          ${shader}
          fragColor = vec4(color, opacity);
          fragColor.rgb *= fragColor.a;
        }
      `}
    />
  );
}

function Shader({ source, uniforms }) {
  return (
    <Canvas className="canvas-reveal-canvas">
      <ShaderMaterial source={source} uniforms={uniforms} />
    </Canvas>
  );
}

function ShaderMaterial({ source, uniforms, maxFps = 60 }) {
  const { size } = useThree();
  const meshRef = useRef(null);
  const previousFrameRef = useRef(0);

  const preparedUniforms = useMemo(() => {
    const result = {};
    Object.entries(uniforms).forEach(([name, uniform]) => {
      if (uniform.type === "uniform1f" || uniform.type === "uniform1fv") {
        result[name] = { value: uniform.value };
      }
      if (uniform.type === "uniform3fv") {
        result[name] = {
          value: uniform.value.map((value) => new THREE.Vector3().fromArray(value)),
        };
      }
    });
    result.u_time = { value: 0 };
    result.u_resolution = { value: new THREE.Vector2(size.width * 2, size.height * 2) };
    return result;
  }, [size.height, size.width, uniforms]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;
          void main() {
            gl_Position = vec4(position.xy, 0.0, 1.0);
            fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: source,
        uniforms: preparedUniforms,
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
        transparent: true,
      }),
    [preparedUniforms, source],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    if (time - previousFrameRef.current < 1 / maxFps) return;
    previousFrameRef.current = time;
    meshRef.current.material.uniforms.u_time.value = time;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default CanvasRevealEffect;
