'use client';

import { useEffect, useRef, useState } from 'react';
import { GameEngine } from '@/lib/game/engine';
import { GameState } from '@/lib/game/types';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const [state, setState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [timeSurvived, setTimeSurvived] = useState(0);
  const [level, setLevel] = useState(1);
  const [hp, setHp] = useState({ current: 100, max: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new GameEngine(canvas, {
      onState: setState,
      onHUD: (hud) => {
        setScore(hud.score);
        setTimeSurvived(hud.timeSurvived);
        setLevel(hud.level);
        setHp({ current: hud.playerHp, max: hud.playerHpMax });
      }
    });

    engineRef.current = engine;
    engine.startLoop();

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  const hpPct = Math.max(0, Math.min(1, hp.current / Math.max(1, hp.max)));

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div>
            <div style={{ fontWeight: 800 }}>Zombie Puncher</div>
            <div className="small">
              Javi vs Bots • Canvas 2D • Next.js App Router • Desktop-first
            </div>
          </div>
          <div className="row">
            <button onClick={() => engineRef.current?.requestStart()}>Start</button>
            <button onClick={() => engineRef.current?.togglePause()}>Pause/Resume (P)</button>
            <button onClick={() => engineRef.current?.requestRestart()}>Restart</button>
          </div>
        </div>

        <div className="canvasWrap">
          <canvas ref={canvasRef} />

          <div className="hud">
            <div className="hudBox">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontWeight: 800 }}>HP</div>
                <div className="hpBarOuter">
                  <div className="hpBarInner" style={{ width: `${hpPct * 100}%` }} />
                </div>
                <div className="small">
                  {Math.round(hp.current)}/{hp.max}
                </div>
              </div>
              <div className="small" style={{ marginTop: 6 }}>
                Space/Click để đấm • WASD/Arrow để di chuyển
              </div>
            </div>

            <div className="hudBox" style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800 }}>Score: {score}</div>
              <div className="small">Time: {timeSurvived.toFixed(1)}s</div>
              <div className="small">Level: {level}</div>
              <div className="small">State: {state}</div>
            </div>
          </div>

          {(state === 'start' || state === 'paused' || state === 'gameover') && (
            <div className="overlay">
              <div className="panel">
                {state === 'start' && (
                  <>
                    <h2 className="title">👊 Welcome, Javi!</h2>
                    <p className="subtitle">
                      Bạn là siêu anh hùng “bot-slaying” (vui nhộn, không bạo lực nặng).
                      Hãy đấm zombie để sống sót lâu nhất có thể.
                    </p>
                    <div className="row" style={{ marginBottom: 12 }}>
                      <span className="small">
                        <kbd>WASD</kbd>/<kbd>Arrow</kbd> Move • <kbd>Space</kbd> Punch • <kbd>P</kbd> Pause
                      </span>
                    </div>
                    <div className="row">
                      <button onClick={() => engineRef.current?.requestStart()}>Start Game</button>
                    </div>
                  </>
                )}

                {state === 'paused' && (
                  <>
                    <h2 className="title">⏸ Paused</h2>
                    <p className="subtitle">
                      Nhấn <kbd>P</kbd> để tiếp tục. (Hoặc bấm nút Pause/Resume)
                    </p>
                    <div className="row">
                      <button onClick={() => engineRef.current?.togglePause()}>Resume</button>
                    </div>
                  </>
                )}

                {state === 'gameover' && (
                  <>
                    <h2 className="title">💀 Game Over</h2>
                    <p className="subtitle">
                      Điểm: <b>{score}</b> • Thời gian sống sót: <b>{timeSurvived.toFixed(1)}s</b> • Level: <b>{level}</b>
                    </p>
                    <div className="row">
                      <button onClick={() => engineRef.current?.requestRestart()}>Restart</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
