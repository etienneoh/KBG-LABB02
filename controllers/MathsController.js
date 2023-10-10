import MathsModel from '../models/Math.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';
import path from 'path';
import fs from 'fs';
import { isNull } from 'util';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathsModel()));
    }

    help() {
        let helpPagePath = path.join(process.cwd(), wwwroot, 'API-Help-Pages/API-Maths-Help.html');
        this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));
    }

    get() {
        if (this.HttpContext.path.queryString != null) {
            if (this.HttpContext.path.queryString == '?') {
                this.help();
            }
            if (this.HttpContext.path.params != null) {
                let para = this.HttpContext.path.params
                switch (para.op) {
                    case ' ':
                        if (!isNaN(para.x) && !isNaN(para.y) && Object.keys(para).length == 3) {
                            para.value = (parseFloat(para.x) + parseFloat(para.y));
                            this.HttpContext.response.JSON(para);
                        } else {
                            para.error = "L'une des valeurs passée en paramètres n'est pas valide.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    case '-':
                        if (!isNaN(para.x) && !isNaN(para.y) && Object.keys(para).length == 3) {
                            para.value = parseFloat(para.x) - parseFloat(para.y);
                            this.HttpContext.response.JSON(para);
                        } else {
                            para.error = "L'une des valeurs passée en paramètres n'est pas valide.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    case '*':
                        if (!isNaN(para.x) && !isNaN(para.y) && Object.keys(para).length == 3) {
                            para.value = parseFloat(para.x) * parseFloat(para.y);
                            this.HttpContext.response.JSON(para);
                        } else {
                            para.error = "L'une des valeurs passée en paramètres n'est pas valide.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    case '/':
                        if (!isNaN(para.x) && !isNaN(para.y) && Object.keys(para).length == 3) {
                            para.value = parseFloat(para.x) / parseFloat(para.y);
                            if(isNaN(para.value) || para.value == null || para.value == undefined || para.value == Infinity){
                                para.value = 0;
                                para.error = "Y doit être supérieur à 0.";
                            }
                            this.HttpContext.response.JSON(para);
                        } else {
                            para.error = "L'une des valeurs passée en paramètres n'est pas valide.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    case '%':
                        if (!isNaN(para.x) && !isNaN(para.y) && Object.keys(para).length == 3) {
                            para.value = (parseFloat(para.x) % parseFloat(para.y));
                            if(isNaN(para.value)){
                                para.value = 0;
                                para.error = "Y doit être supérieur à 0.";
                            }
                            this.HttpContext.response.JSON(para);
                        } else {
                            para.error = "L'une des valeurs passée en paramètres n'est pas valide.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    case '!':
                        if (!isNaN(para.n) && Object.keys(para).length == 2) {
                            if (para.n >= 0 && Number.isInteger(parseFloat(para.n))) {
                                para.value = this.factoriser(parseInt(para.n))
                                this.HttpContext.response.JSON(para);
                            } else {
                                para.error = "Le paramètre n'est pas valide.";
                                this.HttpContext.response.JSON(para);
                            }
                        } else {
                            para.error = "Les paramètre ne sont pas valides.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    case 'p':
                        if (!isNaN(para.n) && Object.keys(para).length == 2) {
                            if (para.n >= 0 && Number.isInteger(parseFloat(para.n))) {
                                para.value = this.isPrime(parseInt(para.n))
                                this.HttpContext.response.JSON(para);
                            } else {
                                para.error = "Le paramètre n'est pas valide.";
                                this.HttpContext.response.JSON(para);
                            }
                        } else {
                            para.error = "Les paramètre ne sont pas valides.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    case 'np':
                        if (!isNaN(para.n) && Object.keys(para).length == 2) {
                            if (para.n >= 0 && Number.isInteger(parseFloat(para.n))) {
                                para.value = this.findNthPrime(parseInt(para.n))
                                this.HttpContext.response.JSON(para);
                            } else {
                                para.error = "Le paramètre n'est pas valide.";
                                this.HttpContext.response.JSON(para);
                            }
                        } else {
                            para.error = "Les paramètre ne sont pas valides.";
                            this.HttpContext.response.JSON(para);
                        }
                        break;
                    default:
                        this.HttpContext.response.notImplemented("Cette fonctionnalité n'est pas implementé. Veuillez faire votre requête à '/api/maths?' pour une liste des requête disponible.");
                        break;
                }
            } else {
                this.HttpContext.response.notImplemented("Cette fonctionnalité n'est pas implementé. Veuillez faire votre requête à '/api/maths?' pour une liste des requête disponible.");
            }

        } else {
            this.HttpContext.response.notImplemented("Cette fonctionnalité n'est pas implementé. Veuillez faire votre requête à '/api/maths?' pour une liste des requête disponible.");
        }
    }
    post(data) {
        this.HttpContext.response.notImplemented("Cette fonctionnalité n'est pas implementé. Veuillez faire votre requête à '/api/maths?' pour une liste des requête disponible.");
    }
    put(data) {
        this.HttpContext.response.notImplemented("Cette fonctionnalité n'est pas implementé. Veuillez faire votre requête à '/api/maths?' pour une liste des requête disponible.");
    }
    remove(data) {
        this.HttpContext.response.notImplemented("Cette fonctionnalité n'est pas implementé. Veuillez faire votre requête à '/api/maths?' pour une liste des requête disponible.");
    }

    factoriser(n) {
        //Ce code est tiré d'un article par Educative.io: https://www.educative.io/answers/how-to-find-the-factorial-of-a-number-in-javascript
        if (n == 0 || n == 1) {
            return 1;
        } else {
            return n * this.factoriser(n - 1);
        }
    }

    isPrime(n) {
        //Ce code est tiré d'un article par W3resource.com: https://www.w3resource.com/javascript-exercises/javascript-function-exercise-8.php
        if (n === 1) {
            return false;
        }
        else if (n === 2) {
            return true;
        } else {
            for (var x = 2; x < n; x++) {
                if (n % x === 0) {
                    return false;
                }
            }
            return true;
        }
    }

    findNthPrime(n) {
        //Ce code est tiré d'un article par Nikitasha Shrivastava: https://www.tutorialspoint.com/finding-the-nth-prime-number-in-javascript
        let count = 0;
        let num = 2;
        while (count < n) {
          if (this.isPrime(num)) {
           count++;
          }
          num++;
        }
        return num - 1;
       }

}