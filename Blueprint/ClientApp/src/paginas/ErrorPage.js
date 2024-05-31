import style from './ErrorPage.module.css';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ErrorPage() {
    return (
        <div className={style.container}>
            <p className={style.icone}><FontAwesomeIcon icon={faTriangleExclamation} /></p>
            <h1>Oops!</h1>
            <p className={style.descricao}>Um erro aconteceu</p>
            <p className={style.descricaoerro}>Essa página não existe</p>
        </div>
    );
}

export default ErrorPage;