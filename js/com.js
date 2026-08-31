const LogContainer   = null
const ConnectButton  = null
const DownloadButton = null
const ClearButton    = null

window.addEventListener("load", () => {
    DownloadButton.addEventListener("click", downloadLog)
})

/**
 * ログのダウンロード処理
 */
function downloadLog() {
    // ダウンロード対象のテキストを取得
    const logText  = logContainer.textContent
    // ダウンロード：ファイル名
    const fileName = "test.txt"
    // ダウンロード：ファイル内容
    const fileBlob = new Blob([logText], { type: `${"text/plain"};charset=utf-8;` }) 
    // 一時的なダウンロード用リンクの作成
    const link = document.createElement('a')
    link.href = URL.createObjectURL(fileBlob)
    link.download = fileName

    // リンクをDOMに追加してクリックを発火後、削除
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // メモリ解放
    URL.revokeObjectURL(link.href);
}


//   <script>
//     let port             = null
//     let reader           = null
//     let keepReading      = false
//     const connectBtn     = document.getElementById('connect-btn' )
//     const clearBtn       = document.getElementById('clear-btn'   )
//     const baudrateSelect = document.getElementById('baudrate'    )
//     const statusText     = document.getElementById('status'      )
//     const logContainer   = document.getElementById('log'         )
//     const downloadBtn    = document.getElementById("download-btn")

//     downloadBtn.addEventListener("click", () => {
//       // 出力対象のテキストを取得
//       const text     = logContainer.textContent
//       const fileName = "test.txt"
//       const blob = new Blob([text], { type: `${"text/plain"};charset=utf-8;` })

//     // 一時的なダウンロード用リンク要素の作成
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = fileName

//     // リンクをDOMに追加してクリックを発火後、削除
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     // メモリ解放
//     URL.revokeObjectURL(link.href);


// // // フォームの値を取得
// //     const content = document.getElementById('content').value;
// //     const baseFilename = document.getElementById('filename').value.trim() || 'download';
// //     const formatValue = document.getElementById('format').value.split('|');
    
// //     const mimeType = formatValue[0];
// //     const extension = formatValue[1];
// //     const fullFilename = baseFilename.endsWith(extension) ? baseFilename : baseFilename + extension;

// //     // Blob（バイナリ巨大オブジェクト）の作成（文字化け防止のため BOM 付与/UTF-8指定）
// //     const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });

// //     // 一時的なダウンロード用リンク要素の作成
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = fullFilename;

// //     // リンクをDOMに追加してクリックを発火後、削除
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);

// //     // メモリ解放
// //     URL.revokeObjectURL(link.href);      
//     })

//     // ログ書き込み処理
//     // 書き込みをする前に一時的にQueueに追加
//     var logQueue = ""

//     function appendLog(text) {
//         console.log(text)
//         const textCRLF = text.replace(/\r\n|\r|\n/g, '\r\n')
//         logQueue += textCRLF

//         // 改行文字で分割
//         let splitLog = logQueue.split("\r\n")
        
//         for(let i = 0;i < splitLog.length - 1;i++) {
//             let text = splitLog[i]
//             let splitText = text.split(" ")
//             // 0 コード
//             // 1 2日次
//             // 3 OK NG
//             let data = {
//                 code   : splitText[0],
//                 date   : splitText[1] + " " + splitText[2],
//                 result : splitText[3]
//             }

//             console.log(splitLog[i])

//             const reports = {
//               "00000338" : "調味料・ほうれん草コーン",
//               "00000339" : "共通食材・ほうれん草・コーン",
//             }

//             const items = {
//               "01008470" : "おいしさプラス調味酢",
//               "01008510" : "Ｇ味の素ＫＫコンソメＪ　５００ｇ袋　Ａ",
//               "01008520" : "シェフリッチ５２Ｈ",
//               "01008530" : "タピオカ澱粉ES-5　",
//               "01008460" : "冷凍ほうれん草",
//               "01008500" : "コーンカーネル",
//             }

//             // 記録者情報
//             const members = {
//               "05347708" : "鈴木 悠太",
//               "05345452" : "亀井　佐和子",
//               "05347753" : "村田　真由美",
//               "05347719" : "斎藤　典子",
//             }

//             switch(data.code.substring(0, 4)) {
//                 case "1100": // 計量帳票の記録開始：[${name}]
//                   {
//                     let reportId   = data.code.substring(4, 12)
//                     let reportName = reports[reportId] ?? reportId
//                     logContainer.textContent += `${data.date}|帳票記録開始[${reportName}]\r\n`
//                   }
//                   break
//                 case "1200": // 計量帳票の記録終了：[${name}]
//                   {
//                     let reportId   = data.code.substring(4, 12)
//                     let reportName = reports[reportId] ?? reportId
//                     logContainer.textContent += `${data.date}|帳票記録終了[${reportName}]\r\n`
//                   }
//                   break

//                 case "2100": // 記録開始：[${name}]
//                   {
//                     let memberId   = data.code.substring(4, 12)
//                     let memberName = members[memberId] ?? memberId
//                     logContainer.textContent += `${data.date}|作業者開始[${memberName}]\r\n`
//                   }

//                   break
//                 case "2200": // 記録終了：[${name}]
//                   {
//                     let memberId = data.code.substring(4, 12)
//                     let memberName = members[memberId] ?? memberId
//                     logContainer.textContent += `${data.date}|作業者終了[${memberName}]\r\n`
//                   }
//                   break
//                 case "3100": // 計量品目
//                   {
//                     let itemNo   = data.code.substring(4,  8)
//                     let itemId   = data.code.substring(8, 16)
//                     let itemName = items[itemId] ?? itemId
//                     logContainer.textContent += `${data.date}|計量品目[${itemName}]|番号[${itemNo}]|検証結果[${data.result}]\r\n`
//                   }
//                   break
//             }
//         }

//         logQueue = splitLog[splitLog.length - 1]
    




//         // const splitText = textCRLF.split("\r\n")


//     //   logContainer.textContent += textCRLF;
//     //   logContainer.scrollTop = logContainer.scrollHeight;
//     }

//     connectBtn.addEventListener('click', async () => {
//       if (port) {
//         await disconnect();
//       } else {
//         await connect();
//       }
//     });

//     clearBtn.addEventListener('click', () => {
//       logContainer.textContent = '';
//     });

//     // 接続処理
//     async function connect() {
//       if (!('serial' in navigator)) {
//         alert('お使いのブラウザはWeb Serial APIに対応していません。ChromeまたはEdgeを使用してください。');
//         return;
//       }

//       try {
//         port = await navigator.serial.requestPort();
//         const baudRate = parseInt(baudrateSelect.value, 10);
        
//         await port.open({ baudRate });

//         statusText.textContent = '接続中';
//         statusText.className = 'connected';
//         connectBtn.textContent = '切断';
//         baudrateSelect.disabled = true;

//         keepReading = true;
//         appendLog('--- ポートを開きました（即時表示モード） ---\n');

//         readLoop();

//       } catch (error) {
//         console.error('接続エラー:', error);
//         appendLog(`\n[エラー]: ${error.message}\n`);
//         resetState();
//       }
//     }

//     // 即時出力対応の受信ループ
//     async function readLoop() {
//       // ストリーム変換を使わず、バイナリ(Uint8Array)で直接受信
//       reader = port.readable.getReader();
//       const decoder = new TextDecoder();

//       try {
//         while (keepReading) {
//           const { value, done } = await reader.read();
//           if (done) break;

//           if (value && value.length > 0) {
//             // 1. テキストに変換（改行を待たずに即時出力）
//             const text = decoder.decode(value, { stream: true });
//             const time = new Date().toLocaleTimeString();

            

//             appendLog(text)

            
//             // // 2. 16進数（HEX）文字列を作成（デバッグ用）
//             // const hex = Array.from(value)
//             //   .map(b => b.toString(16).padStart(2, '0').toUpperCase())
//             //   .join(' ');

//             // const time = new Date().toLocaleTimeString();

//             // // 受信したブロックごとに時刻・テキスト・HEXを表示
//             // appendLog(`[${time}] TEXT: "${text}" | HEX: [${hex}]\n`);
//           }
//         }
//       } catch (error) {
//         if (keepReading) {
//           console.error('受信エラー:', error);
//           appendLog(`\n[受信エラー]: ${error.message}\n`);
//         }
//       } finally {
//         reader.releaseLock();
//       }
//     }

//     function resetState() {
//       keepReading = false;
//       port = null;
//       reader = null;
//       statusText.textContent = '未接続';
//       statusText.className = 'disconnected';
//       connectBtn.textContent = '接続';
//       baudrateSelect.disabled = false;
//     }

//     // 切断処理
//     async function disconnect() {
//       keepReading = false;

//       if (reader) {
//         try {
//           await reader.cancel();
//         } catch (e) {
//           console.warn('Reader cancel error:', e);
//         }
//       }

//       if (port) {
//         try {
//           if (port.readable || port.writable) {
//             await port.close();
//           }
//         } catch (e) {
//           console.warn('Port close error:', e);
//         }
//       }

//       resetState();
//       appendLog('--- 切断しました ---\n');
//     }
//   </script>