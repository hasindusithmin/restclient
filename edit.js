

let exist_comment = {};
let new_comment = {}

const fetch_comment = async()=>{
    document.getElementById('alert').innerHTML = 'edit form';
    const id = localStorage.getItem('id')
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
    const comment = await response.json();
    let {name,email,body} = comment;
    exist_comment = {name,email,body};
    const values = Object.values(exist_comment);
    let inputs = document.querySelectorAll('input')
    let index = 0;

    inputs.forEach(input=>{
        input.placeholder = values[index]
        input.readOnly = true;
        input.onmouseover = ()=>{
            document.getElementById('alert').innerHTML = 'click to edit'
        }
        input.onmouseout = ()=>{
            document.getElementById('alert').innerHTML = 'edit form';
        }
        input.onclick = ()=>{
            input.readOnly = false;
            input.placeholder = 'write....'
        }
        index++
    })
}

document.querySelector('form').onsubmit = (e)=>{
    e.preventDefault()
    const formData  = new FormData(document.querySelector('form'))
    for (let[key,value] of formData.entries()){
        new_comment[key] = value;
    }
    const final_comment = {}
    final_comment['name'] = (new_comment.name == '') ? exist_comment.name:new_comment.name;
    final_comment['email'] = (new_comment.email == '') ? exist_comment.email:new_comment.email;
    final_comment['body'] = (new_comment.body == '') ? exist_comment.email:new_comment.body;
    console.log('====================================');
    console.log(final_comment);
    console.log('====================================');
    //fire PUT operation 
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
}