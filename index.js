

// const seed_due_step = async(commentObj)=>{
//     const response = await fetch('http://127.0.0.1:3000/comment',{
//         method:'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(commentObj)
//     })
//     return await response.status;
// }


// const seed_uno_step = async(id)=>{
//     const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
//     return await response.json()
// }
// let index = 1;
// let numb;
// const load_balancer = ()=>{
//     if (index >= 30) clearInterval(numb)
//     seed_uno_step(index).then(result=>{
//         seed_due_step(result).then(_result=>{
//             console.log('====================================');
//             console.log(_result);
//             console.log('====================================');
//         })
//     })
//     index++;
// }

//warning:seeding point
// numb = setInterval(load_balancer,2000)

const get_all_comment = async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    const comments = await response.json()
    return comments
}

get_all_comment().then(result=>{
    let trList = [];
    result.forEach(r=>{
        let tr = document.createElement('tr');
        let tdList = [];
        let values = Object.values(r)
        delete values[0];
        // delete values[0];
        for (value of values) {
            if (typeof value !== 'undefined') {
                const td = document.createElement('td');
                td.innerHTML = value;
                tdList.push(td);
            }
        }
        //create button for put operation
        const td1 = document.createElement('td');
        const btn1 = document.createElement('button');
        btn1.innerHTML = 'EDIT';
        btn1.id = r.id;
        btn1.onclick = (e)=>{
            localStorage.setItem('id',e.target.id);
            window.location.replace('/edit.html')
        }
        td1.appendChild(btn1);
        tdList.push(td1);

        //create button for delete operation
        const td2 = document.createElement('td');
        const btn2 = document.createElement('button');
        btn2.innerHTML = 'DEL';
        btn2.id = r.id;
        btn2.onclick = (e)=>{
            if (confirm('do you want to delete this comment')){
                console.log('====================================');
                console.log(e.target.id);
                console.log('====================================');
                //fire DELETE operation 
                //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            }
            
        }
        td2.appendChild(btn2);
        tdList.push(td2);

        tdList.forEach(td=>{
            tr.appendChild(td);
        })
        
        trList.push(tr);
    })
    trList.forEach(tr=>{
        document.querySelector('table').appendChild(tr);
    })
})

const get_single_comment = async(id)=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
    return await response.json()
}

// get_single_comment(1).then(result=>{
//     console.log('====================================');
//     console.log(result);
//     console.log('====================================');
// })