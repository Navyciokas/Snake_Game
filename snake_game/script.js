let score = 0
let worm_size = 2
let go_position = 0
let current_position = 5
let process
let process2
let worm_positions = []
let i = 16
let j = 15
let k = 0
let l = 0
let fruit_position = 0

function table_load(){
    let td_id = 1
    let m = 0
    let n = 0
    let tableHtml = "";
    while(m < 15){
        tableHtml += `<tr class="tr1">`;
        while(n < 15){
            tableHtml += `<td class="td1" id="i${td_id}"></td>`;
            td_id++;
            n++;
        }
        n = 0;
        tableHtml += `</tr>`;
        m++;
    }
    tableHtml += '<tr><td colspan="15" class="td1" style="text-align: center;"><button onclick="start()">Start</button></td></tr>'
    document.getElementById("board").innerHTML = tableHtml;

}
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown": 
        if(go_position != 2){go_position = 0; break;}
        break;
      case "ArrowUp":
        if(go_position != 0){go_position = 2; break;}
        break;
      case "ArrowLeft":
        if(go_position != 3){go_position = 1; break;}
        break;
      case "ArrowRight":
        if(go_position != 1){go_position = 3; break;}
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // the last option dispatches the event to the listener first,
  // then dispatches event to window
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;


function color_add(position){
    addCSS(`#i${position}{ background:red; }`)
}
function color_add_first(position){
    addCSS(`#i${position}{ background:green; }`)
}
function color_remove(position){
    addCSS(`#i${position}{ background:white; }`)
}
function start(){
    color_add(current_position)
    process = setInterval('worm_go()', document.getElementById("speed").value*1)
    process2 = setInterval('worm_bump(), worm_bump_itself()', 1)
    spawn_fruit()
}

function worm_go(){
    if(go_position == 0){
        color_add(current_position)
        color_add_first(current_position + 15)
        worm_positions.push(current_position)
        current_position += 15
    }
    else if(go_position == 1){
        while(i < 226){
            if(current_position == i){
                alert_reload()
                break;
            }
            i = i + 15
        }
        i = 16
        color_add(current_position)
        color_add_first(current_position - 1)
        worm_positions.push(current_position)
        current_position -= 1
    }
    else if(go_position == 2){
      color_add(current_position)
      color_add_first(current_position - 15)
        worm_positions.push(current_position)
        current_position -= 15
    }
    else if(go_position == 3){
        while(j < 226){
        if(current_position == j){
            alert_reload()
            break;
        }
        j = j + 15
        }
        j = 15
        next_position = current_position + 1
        color_add(current_position)
        color_add_first(current_position + 1)
        worm_positions.push(current_position)
        current_position += 1
    }
    eat_fruit()
}
function worm_bump(){
    if(current_position > 225){   // bump to bottom
        alert_reload()
    }
    if(current_position < 1){   // bump top
        alert_reload()
    }
}
function alert_reload(){
      alert("U bumped...")
      clearInterval(process)
      clearInterval(process2)
      location.reload()
}
function worm_delete(){
    if(worm_size < worm_positions.length){
    color_remove(worm_positions[0])
    worm_positions.shift()
    }
}
function worm_bump_itself(){
    while(k < worm_positions.length){
    if(current_position == worm_positions[k]){
        alert_reload()
        break;
    }
    k++
  }
  k = 0
}
function spawn_fruit(){
    fruit_position = Math.round(Math.random() * 225) + 1;
    while(l < worm_positions.length){
        if(fruit_position == worm_positions[l]){
            spawn_fruit()
            break;
        }
        l++
    }
    addCSS(`#i${fruit_position}{ background:blue; }`)
}
function eat_fruit(){
    if(fruit_position == current_position){
        worm_size = worm_size + 1
        spawn_fruit()
        score++
        document.getElementById("score").innerHTML = score
        if(score == 221){
            alert("Wow... U won")
        }
    }
    else{
        worm_delete()
    }
}



// --- Navyciok 2023 ---- //