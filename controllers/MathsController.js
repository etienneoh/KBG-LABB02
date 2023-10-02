import MathsModel from '../models/Maths.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';
import path from 'path';
import fs from 'fs';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathsModel()));
    }

    help(){
        let helpPagePath = path.join(process.cwd(),wwwroot,'API-Help-Pages/API-Maths-Help.html');
        this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));
    }

    get(){
        if(this.HttpContext.path.queryString == '?'){
            this.help();

        }
        else{
            this.doOperation();
        }
    }
    
}