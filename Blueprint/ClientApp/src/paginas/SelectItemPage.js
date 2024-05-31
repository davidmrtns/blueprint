import style from './SelectItemPage.module.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SelectItemPage() {
    return (
        <div className={style.container}>
            <p className={style.icone}><FontAwesomeIcon icon={faEye} /></p>
            <h1>Selecione um item para visualizar</h1>
        </div>
    );
}

export default SelectItemPage;