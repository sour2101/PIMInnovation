export class AttributeService{

    
    constructor(){}

    setTypeId(id){
        localStorage.setItem('attrTypeId',id);
    }

    setGroupId(id){
        localStorage.setItem('attrGroupId',id);
    }

    getGroupId(){
        return localStorage.getItem('attrGroupId');
    }

    getTypeId(){
        return localStorage.getItem('attrTypeId');
    }
}