import { useEffect, useState } from "react";

const commands = [
  {
    command: "profile",
    output:
      "React ve JavaScript ile modern, kullanıcı odaklı ve sürdürülebilir web uygulamaları geliştiren bir Yazılım Mühendisiyim. Temiz kodu, güçlü kullanıcı deneyimini ve estetik arayüzleri bir araya getirirken teknik yetkinliklerimi backend teknolojileri ve yapay zekâ alanlarında da genişletiyorum.",
  },
  { command: "location", output: "İstanbul, Türkiye" },
  {
    command: "focus",
    output: "React | JavaScript | TypeScript | Frontend Development",
  },
];

const TYPING_SPEED = 55;
const OUTPUT_DELAY = 900;
const NEXT_LINE_DELAY = 450;

function Terminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (lineIndex >= commands.length) return;
    const currentCommand = commands[lineIndex].command;

    if (typedLength < currentCommand.length) {
      const timeoutId = setTimeout(() => setTypedLength((length) => length + 1), TYPING_SPEED);
      return () => clearTimeout(timeoutId);
    }

    const timeoutId = setTimeout(() => setShowOutput(true), OUTPUT_DELAY);
    return () => clearTimeout(timeoutId);
  }, [lineIndex, typedLength]);

  useEffect(() => {
    if (!showOutput) return;
    const timeoutId = setTimeout(() => {
      setLineIndex((index) => index + 1);
      setTypedLength(0);
      setShowOutput(false);
    }, NEXT_LINE_DELAY);
    return () => clearTimeout(timeoutId);
  }, [showOutput]);

  const isTyping = lineIndex < commands.length;

  return (
    <div className="terminal">
      <div className="terminal-titlebar">
        <div className="terminal-dots" aria-hidden="true">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-title">ibrahim@portfolio: ~</span>
      </div>

      <div className="terminal-body">
        {}
        {commands.slice(0, lineIndex).map((line) => (
          <div key={line.command}>
            <p className="terminal-command-row">
              <span className="terminal-prompt">ibrahim@portfolio:~$</span> {line.command}
            </p>
            <p className="terminal-output">{line.output}</p>
          </div>
        ))}

        {}
        {isTyping && (
          <div>
            <p className="terminal-command-row">
              <span className="terminal-prompt">ibrahim@portfolio:~$</span>{" "}
              {commands[lineIndex].command.slice(0, typedLength)}
              <span className="terminal-cursor" />
            </p>
            {showOutput && <p className="terminal-output">{commands[lineIndex].output}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
