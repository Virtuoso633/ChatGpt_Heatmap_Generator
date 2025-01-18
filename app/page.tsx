// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

import HeatmapGenerator from './components/HeatmapGenerator'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-black">ChatGPT Usage Heatmap</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Visualize your ChatGPT conversation patterns. Upload your conversations.json file to generate a detailed heatmap of your usage.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <HeatmapGenerator />
      </div>

      <div className="max-w-2xl mx-auto prose">
        <h2>How to Use:</h2>
        <ol>
          <li>
            🛠 <strong>Export Your ChatGPT Conversations</strong>
            <ul>
              <li>⚙️ Go to <strong>Settings</strong> → <strong>Data Controls</strong> → <strong>Export Data</strong></li>
              <li>📧 Check your email faster than you check your notifications.</li>
            </ul>
          </li>
          <li>
            📂 <strong>Unzip the Export</strong>
            <ul>
              <li>🗂 Open the zip file like you're unlocking a treasure chest.</li>
            </ul>
          </li>
          <li>
            🕒 <strong>Select Your Timezone</strong>
            <ul>
              <li>🕰 Don’t let ChatGPT think you’re living on Mars.</li>
            </ul>
          </li>
          <li>
            📅 <strong>Choose the Year to Visualize</strong>
            <ul>
              <li>🎉 Relive your most hilarious or deep AI conversations.</li>
              <li>(But hey, use ChatGPT a bit first 😬 if you want an actual graph!)</li>
            </ul>
          </li>
          <li>
            📤 <strong>Upload the <code>conversations.json</code> File</strong>
            <ul>
              <li>🖱 Drop it like it’s hot (or just click "Upload").</li>
            </ul>
          </li>
        </ol>

        <h2>🎭 Privacy Note:</h2>
        <p>
          Your data stays in your browser!<br />
          No shady uploads to some mystery server.<br />
          Even ChatGPT won’t know your secrets. 🤫
        </p>
      </div>
    </div>
  )
}
