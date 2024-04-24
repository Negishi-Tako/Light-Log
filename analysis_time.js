function time(){
    var element = document.getElementById('loading');
    element.style.display = '';
    var start = "";
    var end = ""; 
    var st = "";
    var data = "";
    var data1 = "";
    var time = [];
    var count = [];
    var counter = 0;
    var log = document.getElementById("logfile").files[0];
    var reader = new FileReader();
    var ctx = document.getElementById('Chart');
    reader.readAsText(log);
    /*処理が終わってからファイル渡されるらしい*/
    var access = [];
    reader.onload = function(){
        var line = reader.result.split(/\r?\n/);
        /*ここでlineを処理*/
        const len = line.length;
        st = line[0].split("[")[1];
        st = st.split("]")[0];
        st = st.split(" ")[0];
        st = st.slice(0,17)
        var start = st;
        access.push(st.slice(0,17));
        for(let i=1;i<len-1;i++){
            st = line[i].split("[")[1];
            st = st.split("]")[0];
            st = st.split(" ")[0];
            access.push(st.slice(0,17));
        }; 
        var end = st.slice(0,17);
        
        /*split処理*/
        data1 = access[0];
        counter = 1;
        for(let ii=1;ii<len-1;ii++){
            data = access[ii];
            if(data==data1){
                counter += 1;
            }else{
                time.push(data1);
                count.push(counter);
                counter = 1
            }
            data1 = data;
        };

        var chart = new Chart(ctx, {
            type:"line",
            data:{
                labels:time,
                datasets:[{
                    label: 'アクセス数推移',
                    data: count,
                    borderColor: 'rgba(255, 100, 100, 1)',
                }]
            },
            options:{}
        })

        element.style.display = 'none';
    }
    
    
}
function select_ip() {
    var element = document.getElementById('loading');
    element.style.display = '';
    var start = "";
    var end = ""; 
    var st = "";
    var data = "";
    var data1 = "";
    var time = [];
    var count = [];
    var counter = 0;
    var ip = document.getElementById("s_ip").value + " ";
    var log = document.getElementById("logfile").files[0];
    var reader = new FileReader();
    var ctx = document.getElementById('Chart_s');
    reader.readAsText(log);
    /*処理が終わってからファイル渡されるらしい*/
    var access = [];
    reader.onload = function(){
        var line = reader.result.split(/\r?\n/);
        /*ここでlineを処理*/
        const len = line.length;

        for(let i=1;i<len-1;i++){
            if(line[i].split("- -")[0]==ip){
                st = line[i].split("[")[1];
                st = st.split("]")[0];
                st = st.split(" ")[0];
                access.push(st.slice(0,17));
            };
        }; 
        var end = st.slice(0,17);
        
        /*split処理*/
        data1 = access[0];
        counter = 1;
        for(let ii=1;ii<len-1;ii++){
            data = access[ii];
            if(data==data1){
                counter += 1;
            }else{
                time.push(data1);
                count.push(counter);
                counter = 1
            }
            data1 = data;
        };

        var chart = new Chart(ctx, {
            type:"line",
            data:{
                labels:time,
                datasets:[{
                    label: '特定IPアドレスアクセス数推移',
                    data: count,
                    borderColor: 'rgba(255, 100, 100, 1)',
                }]
            },
            options:{}
        })

        element.style.display = 'none';
    }
}