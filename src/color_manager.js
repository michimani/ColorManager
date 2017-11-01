var ColorManager = function(){
    this.generateColorCode = function(count, base_code) {
        var list = [];
        try {
            if (count < 1) {
                throw '"gen_cnt" must be an integer greater than or equal to 1.';
            }

            if (!base_code.match(/^#[0-9a-f]{6}$/i)) {
                throw 'The format of "base_color" is invalid. Please specify it with 6 hexadecimal digits.';
            }

            var base_rgb = this.__hexToRgb(base_code);
            var max_val = Math.max.apply(null, base_rgb);
            var min_val = Math.min.apply(null, base_rgb);


            var color_range = Math.floor(((max_val - min_val) * 6) / count);
            if (color_range < 1) {
                color_range = 1;
            }

            var max_val_idx = base_rgb.indexOf(max_val);
            var min_val_idx = base_rgb.indexOf(min_val);

            switch (max_val_idx) {
                case 0:
                    var snd_idx = 0;
                    if (min_val_idx === 1) {
                        var fst_idx = 2;
                        var trd_idx = 1;
                    } else {
                        var fst_idx = 1;
                        var trd_idx = 2;
                    }
                    break;
                case 1:
                    var snd_idx = 1;
                    if (min_val_idx === 0) {
                        var fst_idx = 2;
                        var trd_idx = 0;
                    } else {
                        var fst_idx = 0;
                        var trd_idx = 2;
                    }
                    break;
                case 2:
                    var snd_idx = 2;
                    if (min_val_idx === 0) {
                        var fst_idx = 1;
                        var trd_idx = 0;
                    } else {
                        var fst_idx = 0;
                        var trd_idx = 1;
                    }
                    break;
            }

            var idx_list = [fst_idx, snd_idx, trd_idx];
            var tmp_rgb = base_rgb;
            var roop_cnt = 0;
            var to_up = false;
            var now_idx = fst_idx;
            var next_idx = snd_idx;
            var now_color_range = color_range;
            var color_code_tmp = '';

            if (tmp_rgb[fst_idx] - min_val > max_val - tmp_rgb[fst_idx]) {
                to_up = true;
            }

            while (list.length < count) {
                if (tmp_rgb[fst_idx] == tmp_rgb[snd_idx] && tmp_rgb[snd_idx] == tmp_rgb[trd_idx]) {
                    list.push(this.__rgbToHex(tmp_rgb));
                } else {
                    if (now_color_range < 1) {
                        now_color_range = 1;
                    }

                    if (to_up) {
                        if (tmp_rgb[now_idx] + now_color_range > max_val) {
                            now_color_range = now_color_range - (max_val - tmp_rgb[now_idx]);
                            tmp_rgb[now_idx] = max_val;
                            now_idx = this.__getNextIndex(now_idx, idx_list);
                            to_up = false;
                        } else {
                            tmp_rgb[now_idx] = tmp_rgb[now_idx] + now_color_range;

                            color_code_tmp = this.__rgbToHex(tmp_rgb);
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

                            color_code_tmp = this.__rgbToHex(tmp_rgb);
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

    this.__hexToRgb = function(color_code) {
        return [parseInt(color_code.substr(1,2), 16), parseInt(color_code.substr(3,2), 16), parseInt(color_code.substr(5,2), 16)];
    }

    this.__rgbToHex = function(rgb) {
        var r = parseInt(rgb[0]).toString(16);
        if (r.length == 1) {r = '0'+r;}

        var g = parseInt(rgb[1]).toString(16);
        if (g.length == 1) {g = '0'+g;}

        var b = parseInt(rgb[2]).toString(16);
        if (b.length == 1) {b = '0'+b;}

        return '#'+r+g+b;
    }

    this.__getNextIndex = function(now_idx, idx_list) {
        switch (now_idx) {
            case idx_list[0]:
                return idx_list[1];
            case idx_list[1]:
                return idx_list[2];
            case idx_list[2]:
                return idx_list[0];
        }
    }
}
