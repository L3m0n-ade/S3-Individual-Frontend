import React, { useState, useEffect, useRef } from "react"


function GamePage() {
    // adding Game.js to file
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/src/pages/Game.js";
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    
//     let canvas = document.createElement("canvas");

//     canvas.width = 1280; canvas.height = 627;
//     canvas.style = "background-color: rgb(255,255,255); padding: 0px; margin: 0px";
//     canvas.id = "canvas";
//     document.body.appendChild(canvas);
//     const c = canvas.getContext("2d");
//     c.fillStyle = "Black";
//     c.fillRect(50,50,50,50);

// addEventListener("keydown", function(e){
//     if (e.code == 'KeyD' || e.code == 'ArrowRight'){ vxr = speed; }
//     if (e.code == 'KeyA' || e.code == 'ArrowLeft'){ vxl = speed; }
//     if (e.code == 'KeyW' || e.code == 'ArrowUp'){ vyu = speed; }
//     if (e.code == 'KeyS' || e.code == 'ArrowDown'){ vyd = speed; }
// })
// addEventListener("keyup", function(e){
//     if (e.code == 'KeyD' || e.code == 'ArrowRight'){ vxr = 0; }
//     if (e.code == 'KeyA' || e.code == 'ArrowLeft'){ vxl = 0; } 
//     if (e.code == 'KeyW' || e.code == 'ArrowUp'){ vyu = 0; }
//     if (e.code == 'KeyS' || e.code == 'ArrowDown'){ vyd = 0; }
// })

    return (
        <>
            {/* <p>Game id: 1</p> */}
            <canvas id="canvas" width="1280" height="627" style={{backgroundColor: 'rgb(255, 255, 255)', padding: '0px', margin: '0px'}}></canvas>
            {/* <script>
                {
                }
            </script> */}
            {/* <script src="V3.js"></script> */}
        </>
    )

    /*
    declaring stuff (canvas, c, cat, boat, line, bg, water)
    */
}

export default GamePage;