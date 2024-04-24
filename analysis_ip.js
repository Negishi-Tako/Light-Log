function ip(){
    // loading要素を取得し、表示する
    var element = document.getElementById('loading');
    element.style.display = '';
    
    // ログファイルとサイズの取得
    var log = document.getElementById("logfile").files[0];
    var size = document.getElementById("size").value;
    
    // 結果を表示する要素
    var re = document.getElementById("acc");
    
    // ローディング画像を表示する要素の生成と設定
    var div = document.createElement('load');
    const ctx = document.getElementById('myChart');
    div.className = 'loading';
    div.innerHTML = "<img src='kurukuru.gif'>"
    
    // ファイルの読み込みと初期化
    var reader = new FileReader();
    var counter = -1;
    var ipg = [];
    var dag = [];
    reader.readAsText(log);
    
    // ファイルの読み込みが完了したときの処理
    reader.onload = function(){
        // ファイルの内容を改行で分割
        var line = reader.result.split(/\r?\n/);
        const len = line.length;
        
        // アクセスのIPアドレスごとの回数を集計
        var access = {};
        for(let i=0; i<len; i++){
            var st = line[i].split("- -")[0];
            if(st in access){
                access[st] = access[st]+1;
            } else {
                access[st] = 1;
                counter += 1;
            };
        }; 
        
        // アクセス回数の多い順にソート
        var so = Object.keys(access).map((e)=>({ ip: e, count: access[e] }));
        so.sort(function(a,b){
            if(a.count < b.count) return 1;
            if(a.count > b.count) return -1;
          });
        
        // 表示するテーブルの生成
        var enter = "<hr><table><caption>"+"アクセス回数:"+len+"</br>ユニークなIPアドレスの数:"+counter+"</caption><th>IPアドレス</th><th>アクセス回数</th>";
        var so = so.slice(0,size);
        var to = 0
        for (let ii=0; ii<size; ii++){
            aa =  so[ii]["ip"];
            bb = so[ii]["count"];
            to = bb + to;
            enter += "<tr><td>"+aa+"</td><td>"+bb+"</td></tr>" ;
            ipg.push(aa);
            dag.push(bb);
        }
        ipg.push("その他");
        dag.push(len-to);

        enter += "</table>";
        re.innerHTML = enter;
        
        // Chart.jsを使用して円グラフを描画
        var chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ipg,
                datasets: [{
                    data: dag
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'アクセス回数の内訳'
                },
                plugins: {
                    colorschemes: {
                        scheme: 'tableau.ClassicRedGreenLight11'
                    }
                }
            }
        })
        
        // loading要素を非表示にする
        element.style.display = 'none';
    }
}
