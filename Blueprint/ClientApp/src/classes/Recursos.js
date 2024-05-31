import blueprint from '../imagens/blueprint-colorido.svg';
import bpvazado from '../imagens/blueprint-vazado.svg';
import carregando from '../imagens/carregando.svg';
import enviando from '../imagens/enviando.svg';
import rd from '../imagens/rd.svg';
import google from '../imagens/google_ads_novo.svg';
import facebook from '../imagens/facebook_ads.svg';
import carteira from '../imagens/carteira.svg';
import digisac from '../imagens/digisac_icon.svg';
import clientes from '../imagens/clientes.svg';
import indicacao from '../imagens/indicacao.svg';
import tecno from '../imagens/tecno.svg';
import luci from '../imagens/luci.svg';
import micro from '../imagens/microsip.svg';
import calculo from '../imagens/calculo.svg';
import meet from '../imagens/meet.svg';
import pdf from '../imagens/pdf.svg';

class Recursos {
    getUnidade(unidade) {
        if (unidade == 0) {
            return 'Hortolândia';
        } else if (unidade == 1) {
            return 'Campinas';
        }
    }

    getCorDepartamento(dep) {
        switch (dep) {
            case 0:
                return '#FFFFFF';
            case 1:
                return '#FFFFFF';
            default:
                return '#FFFFFF';
        }
    }

    getLogoBlueprint() {
        return blueprint;
    }

    getLogoBlueprintVazado() {
        return bpvazado;
    }

    getCarregando() {
        return carregando;
    }

    getEnviando() {
        return enviando;
    }

    getLogoRd() {
        return rd;
    }

    getLogoGoogleAds() {
        return google;
    }

    getLogoFaceAds() {
        return facebook;
    }

    getIconCarteira() {
        return carteira;
    }

    getIconDigisac() {
        return digisac;
    }

    getIconClientes() {
        return clientes;
    }

    getIconIndicacao() {
        return indicacao;
    }

    getIconTecno() {
        return tecno;
    }

    getIconLuci() {
        return luci;
    }

    getIconMicrosip() {
        return micro;
    }

    getIconCalculo() {
        return calculo;
    }

    getIconMeet() {
        return meet;
    }

    getIconPdf() {
        return pdf;
    }
}

export default Recursos;
