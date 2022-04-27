let memberlist,prenum,memberscore,memberpat,membertotal,out_count,in_count,par_count,
	out_par,in_par;
let hidden = [];


//読み込み時自動実行
window.addEventListener("DOMContentLoaded", function(){
//	document.getElementById('handler').addEventListener('click', mark);
	memberlist = new Array(100);
	prenum = 1
	memberscore = new Array(100);
	memberpat = new Array(100);
	membertotal = new Array(100);
	for(var x=0;x<=100;x++){
		memberlist[x]="";
		memberscore[x]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		memberpat[x]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		membertotal[x]=[0,0,0,0]
	}

//コース・プレイヤー表示
	course_table(false);
	player_table(1);
})

//コース表示
function course_table(handi){
	text = "<table border><tr><td>コース</td>\
	 <td>ホール</td>";
	for(var j=1; j<10; j++){
		text += "<td id=0holetable"+j+"><label>"+ j;
		if(handi){
			text += "<input type=checkbox onChange=handichecking() id=check"+ j +">"
		}
		text += "</label></td>"
	}
	text += "<td>アウト</td><td>合計</td></tr><tr><td rowspan=3><input onChange=changing()\
	 id=titlegolf value='' type=text size=8 placeholder='タイトル'></td><td>パー</td>"
	for(var j=1; j<10; j++){	
		text = selector(0,j,text,false);
	}
	text += "<td><span id=out_par>0</span></td><td rowspan=3><span id=sum_par>0</span></td></tr><tr><td>ホール</td>"
	for(var j=10; j<19; j++){
		text += "<td id=0holetable"+j+"><label>"+ j;
		if(handi){
			text += "<input type=checkbox onChange=handichecking() id=check"+ j +">"
		}
		text += "</label></td>"
	}
	text += "<td>イン</td></tr><tr><td>パー</td>"
	for(var j=10; j<19; j++){	
		text = selector(0,j,text,false);
	}
	text += "<td><span id=in_par>0</span></td></tr></table>";
	document.getElementById('hole').innerHTML = text;
}



//入力されたスコアを取得
function get_score(){
	for(var x=0; x<=prenum; x++){
		memberscore[x] = new Array(18);
		for(var y=1; y<=18; y++){
			memberscore[x][y] = Number(document.getElementById(x+'hole'+y).value);
		}
	}
}

//プレイヤー表示
function player_table(x){
	text = "<table border>";
	for(var k=1; k<=x; k++){
		text += "<tr><td>プレイヤー</td><td>ホール</td>";
		
		for(var j=1; j<10; j++){
			text += "<td id="+k+"holetable"+j+">"+ j +"</td>"
		}
		text += "<td style=text-align:center>アウト</td>\
				 <td style=text-align:center>グロス</td>\
				 <td style=text-align:center>ネット</td>\
				 </tr><tr><td rowspan=3><input onChange=changing() id=name"
		+ k +" value='' type=text size=8 placeholder='名前'></td><td>スコア<hr>パット</td>"
		for(var j=1; j<10; j++){
			text = selector(k,j,text,true)
		}
		
		text += "<td style=text-align:center id=out" + k +">0</td>\
				 <td style=text-align:center id=gross"+ k +">0</td>\
				 <td style=text-align:center id=net"+ k +" rowspan=3></td>\
				 </tr><tr><td>ホール</td>"
		for(var j=10; j<19; j++){
			text += "<td id="+k+"holetable"+j+">"+ j +"</td>"
		}
		
		text += "<td style=text-align:center>イン</td>\
				 <td style=text-align:center>ハンディ</td>\
				 </tr><tr><td>スコア<hr>パット</td>"
		for(var j=10; j<19; j++){	
			text = selector(k,j,text,true)
		}
		
		text += "<td style=text-align:center id=in"+ k +">0</td>\
				 <td style=text-align:center id=handicap"+ k +"></td>\
				 </tr>";
	}
	text += "</table>";
	document.getElementById('player').innerHTML = text;
}

//セレクト
function selector(k,j,text,sel){
	let p = 3
	let q = 7
	if(sel){
		p = 1;
		q = 20
	}
	text += "<td id="+k+"partable"+j+"><select onChange=changing() id="
			+ k +"hole"+ j +"><option value=0>--</option>";
	for(var i=p; i<=q; i++){
		text += "<option value=" + i;
		if(memberscore[k][j]==i){
			text += " selected";
		}
		text += ">" + i +"</option>";
	}
	if(sel){
		text += "</select>/<span id="+ k + "addscore" + j +
				">---</span><hr><select onChange=changing() id="
				+ k +"pat"+ j +"><option value=0>--</option>";
		for(var i=1 ;i<=20; i++){
			text += "<option value=" + i;
			if(memberpat[k][j]==i){
				text += " selected";
			}
			text += ">" + i +"</option>";
		}
	}
	text += "</select></td>";
	return text;
}


//プレイヤー再表示
function player_number(e){
	get_score();
	let getnum = Number(document.getElementById('number').value);
	for(var x=1; x<=prenum; x++){
		memberlist[x] = document.getElementById('name'+x).value;
	}
	player_table(getnum);
	prenum = getnum
	changing();
}

//パーの合計値を取得・出力
function get_par(){
	out_par = 0;
	in_par = 0;
	for(var x = 1; x<=18; x++){
		if(x<=9){
		out_par += Number(document.getElementById('0hole'+x).value);
		}else{
		in_par += Number(document.getElementById('0hole'+x).value);
		}
	}
	document.getElementById('out_par').innerHTML = out_par;
	document.getElementById('in_par').innerHTML = in_par;
	document.getElementById('sum_par').innerHTML = out_par+in_par;
}

//変更時の処理
function changing(e){
	let getnum = Number(document.getElementById('number').value);
	get_par();
	for(var x = 1; x<=getnum; x++){
		//現在の入力用スコアを初期化
		membertotal[x] = [0,0,0,0];
		for(var y = 1; y<=18; y++){
			nowscore = Number(document.getElementById(x+'hole'+y).value);
			addscore = nowscore -
					   Number(document.getElementById('0hole'+y).value);
			//スコアを表示・色分け・累計
			if(nowscore != 0){
				if(y<=9){
					membertotal[x][0] += nowscore;
				}else{
					membertotal[x][1] += nowscore;
				}
				if(addscore < 0){
					addscore = "<span style=color:blue>" + addscore;
				}else if(addscore > 0){
					addscore = "<span style=color:red>+" + addscore;
				}
			document.getElementById(x+'addscore'+y).innerHTML= addscore
			}else{
			document.getElementById(x+'addscore'+y).innerHTML= "---"
			}
		}
		//アウト、イン、グロスを出力
		document.getElementById('out'+x).innerHTML = membertotal[x][0]+"";
		document.getElementById('in'+x).innerHTML = membertotal[x][1]+"";
		document.getElementById('gross'+x).innerHTML = membertotal[x][0]+membertotal[x][1]+"";
	}
	//ハンディ選択時の挙動
	if(document.getElementById('checkbox').checked){
		handichecking();
	}
	bgcol();
}

function check(e){
	let zerocheck = false;
	let flag;
	getnum = Number(document.getElementById('number').value);
	for(var x = 0; x <= getnum; x++){
		for(var y = 1; y <= 18; y++){
			if(document.getElementById(x+'hole'+y).value == "0"){
				zerocheck = true;
				break;
			}
		}
	}
	if(zerocheck){
		window.alert('未入力の箇所があります。')
		return;
	}
	if(document.getElementById('checkbox').checked && out_count+in_count < 1){
		window.alert('隠しホールが選択されていません。');
		return;
	}
	if(!document.getElementById('checkbox').checked){
		flag = window.confirm('隠しホールをランダム選択して\n集計を開始してよろしいでしょうか？')
	}else{
		flag = window.confirm('集計を開始してよろしいでしょうか？')
	}
	if(!flag){
		return;
	}else{
		if(document.getElementById('checkbox').checked && out_count+in_count!=12){
			if(!window.confirm('隠しホールの選択数が12ではありません。\n集計を続行しますか？')){
				return;
			}
		}
	count();
	}
}




function handichecking(){
	out_count = 0;
	in_count = 0;
	par_count = 0;
	get_par();
	for(var x = 1; x<=18; x++){
		if(document.getElementById('check'+x).checked){
			if(x < 10){
				in_count++;
			}else{
				out_count++;
			}
			par_count += Number(document.getElementById(0+'hole'+x).value);
		}
	}
	document.getElementById('handiself').innerHTML =
							"アウト選択数："+out_count+
							"／イン選択数："+in_count+
							"　合計パー："+par_count;
	
}

function checking(){
	get_score();
	if(document.getElementById('checkbox').checked){
		course_table(true);
		handichecking();
	}else{
		course_table(false);
		get_par();
		document.getElementById('handiself').innerHTML = "";
	}
	bgcol();
}

//集計
function count(){
	let getnum = Number(document.getElementById('number').value);
	let arr_number = kumiawase([1,2,3,4,5,6,7,8,9],6);
	let add48 = [];
	hidden = [];
	if(document.getElementById('checkbox').checked){
		for(var x = 1; x <= 18; x++){
			if(document.getElementById('check'+x).checked){
				hidden.push(x)
			}
		}
	}else{
		for(var x = 0; x < 84; x++){
			for(var y = 0; y < 84; y++){
				let add_par = 0;
				for(var z = 0; z < 6; z++){
					add_par += Number(document.getElementById('0hole'+arr_number[x][z]).value);
					add_par += Number(document.getElementById('0hole'+(arr_number[y][z]+9)).value);
				}
				if(add_par == 48){
					add48.push([x,y]);
				}
			}
		}
		if(add48.length==0){
			window.alert('エラー：\nパーの合計が48になる組み合わせが存在しません。');
			return;
		}
		var random = Math.floor(Math.random() * (add48.length)+1);
		hidden = arr_number[add48[random][0]];
		for(var x = 0; x < 6; x++){
			hidden.push(arr_number[add48[random][1]][x]+9);
		}
	}
	bgcol();
	for(var x = 1; x <= getnum; x++){
		let handi_count = 0;
		for(var y = 0; y < hidden.length; y++){
			handi_count += Number(document.getElementById(x+'hole'+hidden[y]).value);
		}
		membertotal[x][2] = Math.round((handi_count*1.5-in_par-out_par)*0.8);
		membertotal[x][3] = membertotal[x][0]+membertotal[x][1]-membertotal[x][2]
		document.getElementById('handicap'+x).innerHTML = membertotal[x][2];
		document.getElementById('net'+x).innerHTML = membertotal[x][3];
	}
}

function bgcol(){
	let getnum = Number(document.getElementById('number').value);
	for(var x = 0; x <= getnum; x++){
		for(var y = 1; y <= 18; y++){
			document.getElementById(x+'holetable'+y).style.backgroundColor = "#FFFFFF";
			document.getElementById(x+'partable'+y).style.backgroundColor = "#FFFFFF";
		}
		for(var y = 0; y < hidden.length; y++){
			if((hidden[y] != 0) && (hidden[y] != null)){
				document.getElementById(x+'holetable'+hidden[y]).style.backgroundColor = "#F0F0F0";
				document.getElementById(x+'partable'+hidden[y]).style.backgroundColor = "#F0F0F0";
			}
		}
	}
}
//
//https://stabucky.com/wp/archives/5334
//
function kumiawase(balls, nukitorisu){
  var arrs, i, j, zensu, kumis;
  arrs = [];
  zensu = balls.length;
  if(zensu < nukitorisu){
    return;
  }else if(nukitorisu == 1){
    for(i = 0; i < zensu; i++){
      arrs[i] = [balls[i]];
    }
  }else{
    for(i = 0; i < zensu - nukitorisu + 1; i ++){
      kumis = kumiawase(balls.slice(i + 1), nukitorisu - 1);
      for(j = 0; j < kumis.length; j ++){
        arrs.push([balls[i]].concat(kumis[j]));
      }
    }
  }
  return arrs;
}

/*
function test(e){
	memberscore[0]=[0,3,3,4,4,4,4,4,5,5,3,3,4,4,4,4,4,5,5]
	changing();
	if(document.getElementById('checkbox').checked){
		course_table(true);
		handichecking();
	}else{
		course_table(false);
		document.getElementById('handiself').innerHTML = "";
		get_par();
	}

}
*/