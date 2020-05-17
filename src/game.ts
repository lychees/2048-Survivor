//import $ from "jquery";
//import { Camera } from "./camera";
//import { Player } from "./creature";
//import { Map0 } from "./level/lv0";
//import { Map0 } from "./level/arena";
///import { Map0 } from "./level/arena";



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

/*
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
*/

class Player {
    name: string;
    x: number;
    y: number;
    lv: number;
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.lv = 2;
    }
}

class Game {
    
    map: any;
    playerMap: {};
    active_user: string;    

    push_action(message: string) {
    }

    new_player(name: string) {
        let p = new Player(name, 0, 0);
        this.playerMap[name] = p;
    }

    init() {
        this.playerMap = {};
        this.map = {};
       /* this.map = new Map0();         
        this.scheduler = new ROT.Scheduler.Action();        
        this.engine = new ROT.Engine(this.scheduler);
        this.engine.start();        */
    }

    reschedule() {
        /*this.scheduler.clear();
        for (let i=0;i<this.map.agents.length;++i) {
            this.scheduler.add(this.map.agents[i], true);
        }*/
    }
};

export let game = new Game();
game.init();