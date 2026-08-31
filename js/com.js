let LogContainer   = null
let ConnectButton  = null
let DownloadButton = null
let ClearButton    = null
let StatusText     = null

let port           = null
let connecting     = false
let logQueue       = ""

/**
 * [Web Serial API]のサポート確認
 */
function isSupportSerialAPI() {
    return 'serial' in navigator
}

async function readLoop() {
    // 読み込み処理を開始
    reader = port.readable.getReader()
    const decoder = new TextDecoder()

    // 接続中の間はループを続ける
    while(connecting) {
        // ストリームから値を取得
        const { value, done } = await reader.read()
        // 読み込みに失敗した場合は終了する
        if (done) break
        // テキスト無し、またはテキストの長さが[0]の場合はcontinue
        if (!(value && value.length > 0)) continue
        // １．テキストに変換
        const text = decoder.decode(value, { stream : true })
        // ２．書き込み処理に引き渡し
        appendLog(text)
    }
}

/**
 * ログの追加処理
 */
function appendLog(baseText) {
    // 改行コードを[\r\n]に補正
    const text = baseText.replace(/\r\n|\r|\n/g, '\r\n')
    console.log(text)
    // 補正したテキストをキューに追加
    logQueue += text
    // 改行文字で分割
    const splitLog = logQueue.split("\r\n")
    // 分割した末尾（改行の無い処理中の文字列）のみにキューを修正
    logQueue = splitLog[splitLog.length - 1]

    for(let i = 0;i < splitLog.length - 1;i++) {
        // ログを対象に処理
        LogContainer.textContent += splitLog[i] + "\r\n"
    }
}    

window.addEventListener("load", () => {
    ConnectButton  = document.getElementById('connect-btn' )
    ClearButton    = document.getElementById('clear-btn'   )
    LogContainer   = document.getElementById('log'         )
    DownloadButton = document.getElementById("download-btn")
    StatusText     = document.getElementById("status-text" )

    ClearButton   .addEventListener("click", clearLog   )
    DownloadButton.addEventListener("click", downloadLog)
    ConnectButton .addEventListener("click", async () => {
        console.log(connecting)
        if(connecting) {
            disconnectCOM()
        } else {
            connectCOM()
        }
    })
})

function clearLog(){
    LogContainer.textContent = ""
}


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

async function disconnectCOM() {
    connecting = false
    
    if (reader) {
        await reader.cancel()
    }

    if (port) {
        await port.close();
        port = null;
    }

    // UI表示の初期化
    StatusText   .textContent = '未接続'
    StatusText   .className = 'disconnected'
    ConnectButton.textContent = '接続'
}

async function connectCOM() {
    if (!isSupportSerialAPI()) {
        // Serial APIのサポート無し
        alert("お使いのブラウザはWeb Serial APIに対応していません。")
        return
    }

    try {
        // 接続ポートを選択
        port = await navigator.serial.requestPort()
        console.log(port)
        // ポートに接続
        await port.open({ baudRate : 9600 })
        StatusText.textContent = "接続中"
        StatusText.className   = 'connected'

        ConnectButton.textContent = '切断'
        // 接続中に更新
        connecting = true
        readLoop()
    } catch(e) {
        console.log(e)
    }
}
