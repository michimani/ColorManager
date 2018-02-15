class ColorManager {
    randColor(isRgb = false) {
        const rgb = [Math.floor(Math.random() * (255)), Math.floor(Math.random() * (255)), Math.floor(Math.random() * (255))];
        if (isRgb == true) {
            return rgb;
        }
        else {
            return this.rgbToHex(rgb);
        }
    }
    generateGradationColorListByRgb(count, baseColorRgb) {
        let baseColorHex = this.rgbToHex(baseColorRgb);
        return this.generateGradationColorList(count, baseColorHex, true);
    }
    generateGradationColorListByHex(count, baseColorCode) {
        return this.generateGradationColorList(count, baseColorCode);
    }
    generateGradationColorList(count, baseColorCode, isRgb = false) {
        const list = [];
        try {
            if (count < 1)
                throw '"count" must be an integer greater than or equal to 1.';
            if (!baseColorCode.match(/^#[0-9a-f]{6}$/i))
                throw `The format of "base_color" is invalid. Please specify it with 6 hexadecimal digits. {${baseColorCode}}`;
            const baseRgb = this.hexToRgb(baseColorCode);
            const maxVal = Math.max.apply(null, baseRgb);
            const minVal = Math.min.apply(null, baseRgb);
            let colorRange = Math.floor(((maxVal - minVal) * 6) / count);
            if (colorRange < 1)
                colorRange = 1;
            const maxValIdx = baseRgb.indexOf(maxVal);
            const minValIdx = baseRgb.indexOf(minVal);
            const sndIdx = maxValIdx;
            const trdIdx = minValIdx;
            const fstIdx = 3 - sndIdx - trdIdx;
            const idxList = [fstIdx, sndIdx, trdIdx];
            let tmpRgb = baseRgb;
            let roopCnt = 0;
            let nowIdx = fstIdx, next_idx = sndIdx;
            let nowColorRange = colorRange, colorCodeTmp = '';
            let isToUp = tmpRgb[fstIdx] - minVal > maxVal - tmpRgb[fstIdx] ? true : false;
            while (list.length < count) {
                if (tmpRgb[fstIdx] == tmpRgb[sndIdx] && tmpRgb[sndIdx] == tmpRgb[trdIdx]) {
                    if (isRgb == true) {
                        list.push(tmpRgb);
                    }
                    else {
                        list.push(this.rgbToHex(tmpRgb));
                    }
                }
                else {
                    nowColorRange = nowColorRange < 1 ? 1 : nowColorRange;
                    if (isToUp) {
                        if (tmpRgb[nowIdx] + nowColorRange > maxVal) {
                            nowColorRange = nowColorRange - (maxVal - tmpRgb[nowIdx]);
                            tmpRgb[nowIdx] = maxVal;
                            nowIdx = this._getNextIndex(nowIdx, idxList);
                            isToUp = false;
                        }
                        else {
                            tmpRgb[nowIdx] = tmpRgb[nowIdx] + nowColorRange;
                            colorCodeTmp = this.rgbToHex(tmpRgb);
                            if (list.indexOf(colorCodeTmp) < 0 || roopCnt > 2) {
                                if (isRgb == true) {
                                    list.push(this.hexToRgb(colorCodeTmp));
                                }
                                else {
                                    list.push(colorCodeTmp);
                                }
                                roopCnt = 0;
                            }
                            else {
                                roopCnt++;
                            }
                            nowColorRange = colorRange;
                        }
                    }
                    else {
                        if (tmpRgb[nowIdx] - nowColorRange < minVal) {
                            nowColorRange = nowColorRange - (tmpRgb[nowIdx] - minVal);
                            tmpRgb[nowIdx] = minVal;
                            nowIdx = this._getNextIndex(nowIdx, idxList);
                            isToUp = true;
                        }
                        else {
                            tmpRgb[nowIdx] = tmpRgb[nowIdx] - nowColorRange;
                            colorCodeTmp = this.rgbToHex(tmpRgb);
                            if (list.indexOf(colorCodeTmp) < 0 || roopCnt > 2) {
                                if (isRgb == true) {
                                    list.push(this.hexToRgb(colorCodeTmp));
                                }
                                else {
                                    list.push(colorCodeTmp);
                                }
                                roopCnt = 0;
                            }
                            else {
                                roopCnt++;
                            }
                            nowColorRange = colorRange;
                        }
                    }
                }
            }
            return list;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
    hexToRgb(colorCode) {
        return [parseInt(colorCode.substr(1, 2), 16), parseInt(colorCode.substr(3, 2), 16), parseInt(colorCode.substr(5, 2), 16)];
    }
    rgbToHex(rgb) {
        let r = rgb[0].toString(16).length == 1 ? `0${rgb[0].toString(16)}` : rgb[0].toString(16);
        let g = rgb[1].toString(16).length == 1 ? `0${rgb[1].toString(16)}` : rgb[1].toString(16);
        let b = rgb[2].toString(16).length == 1 ? `0${rgb[2].toString(16)}` : rgb[2].toString(16);
        return `#${r}${g}${b}`;
    }
    _getNextIndex(nowIdx, idxList) {
        switch (nowIdx) {
            case idxList[0]: return idxList[1];
            case idxList[1]: return idxList[2];
            case idxList[2]: return idxList[0];
        }
    }
}
