
Example.PeriodicTable = function (containerId) {
    this.containerId = containerId;
};

Example.PeriodicTable.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);
	console.log('c',container);
	var ids = [];
        for (el in ptmap) {
            ids.push("elem_" + ptmap[el].symbol);
        }
	console.log('ids',ids);	
	var self = this;
	SCWeb.core.Server.resolveScAddr(ids, function (keynodes) {					
			    		self._initTable(container, keynodes);
				});
	
    	},

	_initTable: function (container, keynodes) {
	console.log('keynodes',keynodes);
	var res = "";
        for (let row = 0; row <= 10; row++) {
            var cells = "";
            if (row <= 7 && row > 0)
                var n_row = row;
            else n_row = "";
            cells += `
                <div class="period_cell">
                    <div class="period">${n_row}</div>
                </div>
                `.trim();

            for (let col = 1; col <= 18; col++) {
                var id = col + "_" + row;
                var el = ptmap[id];
                if (el) {
			console.log('id', id);
			console.log('keynode', keynodes[id]);
			var id_elem = "elem_" + el.symbol;
                    cells += `
                    <div class="cell">
                        <div class="element ${el.category}" pt_id="${el.symbol}" sc_addr="${keynodes[id_elem]}">
                            <div class="at_num">${el.number}</div>
                            <div class="symbol">${el.symbol}</div>
                            <div class="at_details">${el.name}</div>
                        </div>
                    </div>
                    `.trim();
                } else {
                    if ((row === 0 && (col === 1 || col === 18)) || (row === 1 && (col === 2 || (col >= 13 && col <= 18))) || (row === 3 && (col >= 3 && col <= 12)))
                        n_col = col;
                    else n_col = "";
                    cells += `<div class="cell">
                                <div class="group">${n_col}</div>
                            </div>`.trim();
                    n_col = "";
                }
            }
            res += `<div class="periodic-row">${cells}</div>`;
        }
        res = `<div class="periodic">${res}</div>`;
        container.html(res);	
	}    
};



