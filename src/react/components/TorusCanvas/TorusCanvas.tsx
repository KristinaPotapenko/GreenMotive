import { useEffect, useRef } from "react";
import * as THREE from "three";

import gsap from "gsap";

import { useWindowWidth } from "../../../scripts/hooks/useWindowWidth";

export const TorusCanvas = () => {
  const windowWidth = useWindowWidth();
  const isTablet = windowWidth <= 1023;
  const isMobile = windowWidth <= 767;

  const mountRef = useRef<HTMLDivElement | null>(null);

  const baseStyle = {
    minWidth: "320px",
    minHeight: "320px",
    height: "auto",
    aspectRatio: 1 / 1,
  };

  const style = isMobile
    ? { ...baseStyle, width: "90%" }
    : isTablet
    ? { ...baseStyle, width: "70%" }
    : { ...baseStyle, width: "50%" };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      innerWidth / innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const { clientWidth, clientHeight } = mountRef.current;
    renderer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();

    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const concreteTex = loader.load("/concrete.jpg");
    const grassTex = loader.load("/grass.jpg");
    concreteTex.wrapS = concreteTex.wrapT = THREE.RepeatWrapping;
    grassTex.wrapS = grassTex.wrapT = THREE.RepeatWrapping;

    concreteTex.repeat.set(4, 1);
    grassTex.repeat.set(16, 4);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    concreteTex.anisotropy = maxAnisotropy;
    grassTex.anisotropy = maxAnisotropy;

    grassTex.minFilter = THREE.LinearMipMapLinearFilter;
    grassTex.magFilter = THREE.LinearFilter;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        concreteTex: { value: concreteTex },
        grassTex: { value: grassTex },
        uGrowth: { value: 0.0 },
      },
      vertexShader: `varying vec2 vUv;
    varying vec3 vPos;
    void main(){
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
      fragmentShader: `uniform sampler2D concreteTex;
    uniform sampler2D grassTex;
    uniform float uGrowth;
    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
      vec4 concrete = texture2D(concreteTex, vUv);
      vec4 grass = texture2D(grassTex, vUv);
      float normalizedY = (vPos.y + 3.0) / 6.0;
      
      float mask = smoothstep(1.0 - uGrowth - 0.15, 1.0 - uGrowth + 0.1, normalizedY);

      vec4 color = mix(concrete, grass, mask);
      gl_FragColor = color;
    }`,
    });

    const geometry = new THREE.TorusGeometry(2, 0.6, 64, 128);
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    let growth = { value: 0 };
    gsap.to(growth, {
      value: 1,
      duration: 12,
      delay: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        material.uniforms.uGrowth.value = growth.value;
      },
    });

    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.003;
      torus.rotation.y -= 0.002;
      renderer.render(scene, camera);
    }
    animate();
    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTablet]);
  return <div ref={mountRef} style={style} />;
};
