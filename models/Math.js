import Model from './model.js';

export default class Math extends Model {
    constructor() {
        super();

        this.addField('Op', 'char');
        this.addField('x', 'int');
        this.addField('y', 'int');
        this.addField('n', 'int');
              
        this.setKey("Op");
    }
}