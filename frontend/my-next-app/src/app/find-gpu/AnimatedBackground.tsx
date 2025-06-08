// app/find-gpu/AnimatedBackground.tsx
'use client';

import React, { ReactNode, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ===============================
// REACTIVE PARTICLE SYSTEM
// ===============================
const ReactiveParticleSystem = React.memo(() => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random()*100, y: Math.random()*100, size: Math.random()*3+2, opacity: Math.random()*0.4+0.3, duration: Math.random()*20+15, delay: Math.random()*10, hue: Math.random()*360 }));
  }, [mounted]);

  const movements = useMemo(() => [0,20,-15,10,-8,25,-12,18,-6,30,-20,15,-10,22,-18,8,-25,12,-5,28,-16,14,-9,26,-13], []);
  const start = useCallback(() => setIsInteracting(true), []);
  const end = useCallback(() => setIsInteracting(false), []);

  useEffect(() => {
    if (!mounted) return;
    window.addEventListener('mousedown', start, { passive: true });
    window.addEventListener('mouseup', end, { passive: true });
    return () => {
      window.removeEventListener('mousedown', start);
      window.removeEventListener('mouseup', end);
    };
  }, [mounted, start, end]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left:`${p.x}%`, top:`${p.y}%`, background:`hsl(${p.hue},70%,60%)`, filter:'blur(1px)', boxShadow:`0 0 ${p.size*1.5}px hsla(${p.hue},70%,60%,0.4)` }}
          animate={{ y:[0,-100,0], x:[0, movements[p.id]||0, 0], scale: isInteracting?[1,1.5,1]:[1,1.2,1], opacity:[p.opacity, p.opacity*0.5, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, ease:'linear', delay: p.delay }}
        />
      ))}
    </div>
  );
});
ReactiveParticleSystem.displayName = 'ReactiveParticleSystem';

// ===============================
// LIQUID ENERGY FLOWS
// ===============================
const LiquidEnergyFlows = React.memo(() => {
  const patterns = [0,15,-10,8,-5,12];
  const orbs = [0,30,-20,40];
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {patterns.map((mv,i)=>(
        <motion.div
          key={i}
          className="absolute"
          style={{ left:`${10+i*15}%`, top:'-10%', width:'2px', height:'120%', background:`linear-gradient(180deg,transparent 0%,hsla(${120+i*60},70%,60%,0.6)30%,hsla(${180+i*60},80%,70%,0.4)50%,hsla(${240+i*60},70%,60%,0.6)70%,transparent 100%)` }}
          animate={{ scaleY:[1,1.3,0.9,1.1,1], opacity:[0.4,0.7,0.3,0.6,0.4], x:[0,mv,0] }}
          transition={{ duration:12+i*3, repeat:Infinity, ease:'linear', delay:i }}
        />
      ))}
      {orbs.map((mv,i)=>(
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{ width:`${12+i*3}px`, height:`${12+i*3}px`, left:`${15+i*20}%`, background:`radial-gradient(circle,hsla(${i*90},80%,70%,0.8)0%,hsla(${i*90+60},70%,60%,0.4)50%,transparent100%)`, filter:'blur(2px)', boxShadow:`0 0 ${15+i*3}px hsla(${i*90},80%,70%,0.6)` }}
          animate={{ y:['100vh','-20vh'], x:[0,mv,0], scale:[0.8,1.2,0.8], opacity:[0,0.8,0] }}
          transition={{ duration:20+i*5, repeat:Infinity, ease:'linear', delay:i*3 }}
        />
      ))}
    </div>
  );
});
LiquidEnergyFlows.displayName = 'LiquidEnergyFlows';

// ===============================
// INTERACTIVE ENERGY WAVES
// ===============================
const InteractiveEnergyWaves = React.memo(() => {
  const [pos, setPos] = useState({x:50,y:50});
  const [hover, setHover] = useState(false);
  const move = useCallback((e:MouseEvent)=>{
    setPos({x:(e.clientX/window.innerWidth)*100,y:(e.clientY/window.innerHeight)*100});
  },[]);
  useEffect(()=>{
    let last=0;
    const handler=(e:MouseEvent)=>{
      const now=Date.now(); if(now-last>=50){ move(e); last=now; }};
    window.addEventListener('mousemove',handler,{passive:true});
    window.addEventListener('mouseenter',()=>setHover(true),{passive:true});
    window.addEventListener('mouseleave',()=>setHover(false),{passive:true});
    return ()=>{
      window.removeEventListener('mousemove',handler);
      window.removeEventListener('mouseenter',()=>setHover(true));
      window.removeEventListener('mouseleave',()=>setHover(false));
    };
  },[move]);
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {[0,1,2].map(i=>(
        <motion.div
          key={i}
          className="absolute border rounded-full"
          style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:`${(i+1)*80}px`, height:`${(i+1)*80}px`, marginLeft:`-${(i+1)*40}px`, marginTop:`-${(i+1)*40}px`, borderColor:`hsla(${180+i*60},70%,60%,${0.5-i*0.15})`, borderWidth:'1px', filter:`blur(${i+1}px)` }}
          animate={{ scale:hover?[1,1.5,1]:[1,1.2,1], opacity:hover?[0.6,0.2,0.6]:[0.3,0.1,0.3] }}
          transition={{ duration:6+i*2, repeat:Infinity, ease:'linear', delay:i*0.5 }}
        />
      ))}
      <motion.div
        className="absolute rounded-full"
        style={{ left:`${pos.x}%`, top:`${pos.y}%`, width:'16px', height:'16px', marginLeft:'-8px', marginTop:'-8px', background:'radial-gradient(circle,rgba(6,182,212,0.6)0%,transparent70%)', filter:'blur(2px)' }}
        animate={{ scale:hover?[1,2,1]:[1,1.5,1], opacity:[0.6,0.3,0.6] }}
        transition={{ duration:3, repeat:Infinity, ease:'linear' }}
      />
    </div>
  );
});
InteractiveEnergyWaves.displayName = 'InteractiveEnergyWaves';

// ===============================
// ANIMATED BACKGROUND WRAPPER
// ===============================
const AnimatedBackground = ({children}: {children: ReactNode}) => {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0,1000], [0,-100]);

  const gradientVariants = useMemo(() => ({
    initial: { background: 'radial-gradient(ellipse at top, #0f172a 0%, #020617 50%, #000000 100%)' },
    animate: { background: [
      'radial-gradient(ellipse at top left,  #0f172a  0%, #1e293b 25%, #020617 50%, #000000 100%)',
      'radial-gradient(ellipse at top right, #1e293b  0%, #0f172a 25%, #020617 50%, #000000 100%)',
      'radial-gradient(ellipse at bottom,    #020617  0%, #0f172a 25%, #1e293b 50%, #000000 100%)',
    ] } }), []);

  return (
    <>
      {/* Background effects behind content */}
      <ReactiveParticleSystem />
      <LiquidEnergyFlows />
      <InteractiveEnergyWaves />
      <motion.div
        className="fixed inset-0 -z-20"
        variants={gradientVariants}
        initial="initial"
        animate="animate"
        style={{ y: yTransform }}
        transition={{ background: { duration: 30, repeat: Infinity, ease: 'linear' } }}
      />

      {/* Foreground content */}
      <div className="relative z-0 min-h-screen">
        {children}
      </div>
    </>
  );
};
AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
