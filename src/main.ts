import * as ROT from "rot-js";
import $ from "jquery";
import { Camera } from "./camera";
import { Player } from "./creature";
//import { Map0 } from "./level/lv0";
//import { Map0 } from "./level/arena";

import { Map0 } from "./level/arena";

import { Ch0_Boss } from "./level/lv0";

//import { Sound } from "./sound";
import { CharacterMenu } from "./UI/character";
import { Chat } from "./chat";


import { _, Events } from "./event";
import { Apple, Axes } from "./inventory";


export function get_avg_atk(atk: any) {
    let z = 0;
    for (const a in atk) {
        if (a[0] == 'd') {
            z += atk[a] * (1 + parseInt(a.substr(1))) / 2;
        }        
    }
    return z;
}

export function parse_atk(atk: any) {
    let z = "";
    for (let a in atk) {
        if (z != "") z += ", ";
        z += atk[a] > 0 ? "+" : "";
        z += atk[a] + a;
    }
    return z;
}


export function rand(n: number): number {
    return Math.floor(ROT.RNG.getUniform() * n);    
}

export function dice(n: number): number {
    return rand(n) + 1;
}

export function pop_random(A: Array<[number, number]>): [number, number] {
    var index = rand(A.length);
    return A[index];
}

const DISPLAY_WIDTH = 40;
const DISPLAY_HEIGHT = 25;

class Game {
    
    display: any;
    map: any;
    player: Player;    
    camera: Camera;
    SE: any; //Sound;
    score: number;

    scheduler: any;
    engine: any;
    
    characterMenu: any;

    chat: Chat;

    constructor() {
        this.chat = new Chat();
    }

    push_action(message: string) {

    }

    init() {

        game.display = new ROT.Display({
            width: DISPLAY_WIDTH,
            height: DISPLAY_HEIGHT,
            fontSize: 24,            
            fontFamily: 'sans-serif',
        });
        document.body.replaceChild(game.display.getContainer(), document.getElementById('canvas'));
        //this.SE = new Sound();
        this.SE = {};
        this.characterMenu = new CharacterMenu();

        //this.map = new Map();
        this.map = new Map0();
         //this.map = new Ch0_Boss();
        this.score = 0;
        let p = pop_random(this.map.free_cells);
        
        
        game.player = new Player(p[0], p[1]);
        this.map.agents.push(game.player);

        this.camera = new Camera();

        this.chat.initialize();

        this.scheduler = new ROT.Scheduler.Action();
        for (let i=0;i<this.map.agents.length;++i) {
            this.scheduler.add(this.map.agents[i], true);
        }
        this.engine = new ROT.Engine(this.scheduler);
        this.engine.start();
        this.draw();
        //this.draw_abilities(this.player);
    }

    reschedule() {
        this.scheduler.clear();
        for (let i=0;i<this.map.agents.length;++i) {
            this.scheduler.add(this.map.agents[i], true);
        }
    }

    draw() {     
        this.map.draw();
    }
};

export let game = new Game();
game.init();