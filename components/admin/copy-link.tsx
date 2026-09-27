"use client";

import { useState } from "react";

export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    <p>
      <button type="button" onClick={copy} className="underline">
        {copied ? "Copied" : "Copy preview link"}
      </button>
    </p>
  );
}
