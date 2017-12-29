class ColorManager {
    randColorCode(is_rgb = false) {
        const rgb = [Math.floor(Math.random()*(255)), Math.floor(Math.random()*(255)), Math.floor(Math.random()*(255))];
        console.log(rgb);
        if (typeof is_rgb != 'undefined' && is_rgb == true) {
            return rgb;
        } else {
            return this.rgbToHex(rgb)
        }
    }

    generateGradationColorListByHex(count, base_code) {
        const list = [];
        try {
            if (count < 1) throw '"gen_cnt" must be an integer greater than or equal to 1.';

            if (!base_code.match(/^#[0-9a-f]{6}$/i)) throw `The format of "base_color" is invalid. Please specify it with 6 hexadecimal digits. {${base_code}}`;

            const base_rgb = this.hexToRgb(base_code);
            const max_val = Math.max.apply(null, base_rgb);
            const min_val = Math.min.apply(null, base_rgb);
            let color_range = Math.floor(((max_val - min_val) * 6) / count);
            if (color_range < 1) color_range = 1;

            const max_val_idx = base_rgb.indexOf(max_val);
            const min_val_idx = base_rgb.indexOf(min_val);

            const snd_idx = max_val_idx;
            const trd_idx = min_val_idx;
            const fst_idx = 3 - snd_idx - trd_idx;

            const idx_list = [fst_idx, snd_idx, trd_idx];
            let tmp_rgb = base_rgb;
            let roop_cnt = 0;
            let now_idx = fst_idx, next_idx = snd_idx;
            let now_color_range = color_range, color_code_tmp = '';
            let to_up = tmp_rgb[fst_idx] - min_val > max_val - tmp_rgb[fst_idx] ? true : false;

            while (list.length < count) {
                if (tmp_rgb[fst_idx] == tmp_rgb[snd_idx] && tmp_rgb[snd_idx] == tmp_rgb[trd_idx]) {
                    list.push(this.rgbToHex(tmp_rgb));
                } else {
                    now_color_range = now_color_range < 1 ? 1 : now_color_range;

                    if (to_up) {
                        if (tmp_rgb[now_idx] + now_color_range > max_val) {
                            now_color_range = now_color_range - (max_val - tmp_rgb[now_idx]);
                            tmp_rgb[now_idx] = max_val;
                            now_idx = this.__getNextIndex(now_idx, idx_list);
                            to_up = false;
                        } else {
                            tmp_rgb[now_idx] = tmp_rgb[now_idx] + now_color_range;

                            color_code_tmp = this.rgbToHex(tmp_rgb);
                            if (list.indexOf(color_code_tmp) < 0 || roop_cnt > 2) {
                                list.push(color_code_tmp);
                                roop_cnt = 0;
                            } else {
                                roop_cnt++;
                            }

                            now_color_range = color_range;
                        }
                    } else {
                        if (tmp_rgb[now_idx] - now_color_range < min_val) {
                            now_color_range = now_color_range - (tmp_rgb[now_idx] - min_val);
                            tmp_rgb[now_idx] = min_val;
                            now_idx = this.__getNextIndex(now_idx, idx_list);
                            to_up = true;
                        } else {
                            tmp_rgb[now_idx] = tmp_rgb[now_idx] - now_color_range;

                            color_code_tmp = this.rgbToHex(tmp_rgb);
                            if (list.indexOf(color_code_tmp) < 0 || roop_cnt > 2) {
                                list.push(color_code_tmp);
                                roop_cnt = 0;
                            } else {
                                roop_cnt++;
                            }

                            now_color_range = color_range;
                        }
                    }
                }
            }

            return list;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    hexToRgb(color_code) {
        return [parseInt(color_code.substr(1,2), 16), parseInt(color_code.substr(3,2), 16), parseInt(color_code.substr(5,2), 16)];
    }

    rgbToHex(rgb) {
        let r = parseInt(rgb[0]).toString(16).length == 1 ? `0${parseInt(rgb[0]).toString(16)}` : parseInt(rgb[0]).toString(16);
        let g = parseInt(rgb[1]).toString(16).length == 1 ? `0${parseInt(rgb[1]).toString(16)}` : parseInt(rgb[1]).toString(16);
        let b = parseInt(rgb[2]).toString(16).length == 1 ? `0${parseInt(rgb[2]).toString(16)}` : parseInt(rgb[2]).toString(16);
        return `#${r}${g}${b}`;
    }

    __getNextIndex(now_idx, idx_list) {
        switch (now_idx) {
            case idx_list[0]: return idx_list[1];
            case idx_list[1]: return idx_list[2];
            case idx_list[2]: return idx_list[0];
        }
    }

}