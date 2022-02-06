import './helloworld.css';

export default function helloWolrdButton () {
    const button = document.createElement('button');
    button.innerHTML = 'say hello';
    document.body.appendChild(button);

    button.onclick = () => {
        const text = document.createElement('p');
        text.className = 'text';
        text.innerHTML = 'سلاااااام'
        document.body.appendChild(text);
    }
}