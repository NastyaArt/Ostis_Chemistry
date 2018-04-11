/* --- src/example-common.js --- */
var Example = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/table.js --- */

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





/* --- src/ptmap.js --- */
var ptmap = {
    "1_1": {
        "name": "Hydrogen",
        "category": "diatomic_nonmetal",
        "number": 1,
        "x": 1,
        "y": 1,
        "symbol": "H"
    },
    "18_1": {
        "name": "Helium",
        "category": "noble_gas",
        "number": 2,
        "x": 18,
        "y": 1,
        "symbol": "He"
    },
    "1_2": {
        "name": "Lithium",
        "category": "alkali_metal",
        "number": 3,
        "x": 1,
        "y": 2,
        "symbol": "Li"
    },
    "2_2": {
        "name": "Beryllium",
        "category": "alkaline_earth_metal",
        "number": 4,
        "x": 2,
        "y": 2,
        "symbol": "Be"
    },
    "13_2": {
        "name": "Boron",
        "category": "metalloid",
        "number": 5,
        "x": 13,
        "y": 2,
        "symbol": "B"
    },
    "14_2": {
        "name": "Carbon",
        "category": "polyatomic_nonmetal",
        "number": 6,
        "x": 14,
        "y": 2,
        "symbol": "C"
    },
    "15_2": {
        "name": "Nitrogen",
        "category": "diatomic_nonmetal",
        "number": 7,
        "x": 15,
        "y": 2,
        "symbol": "N"
    },
    "16_2": {
        "name": "Oxygen",
        "category": "diatomic_nonmetal",
        "number": 8,
        "x": 16,
        "y": 2,
        "symbol": "O"
    },
    "17_2": {
        "name": "Fluorine",
        "category": "halogen",
        "number": 9,
        "x": 17,
        "y": 2,
        "symbol": "F"
    },
    "18_2": {
        "name": "Neon",
        "category": "noble_gas",
        "number": 10,
        "x": 18,
        "y": 2,
        "symbol": "Ne"
    },
    "1_3": {
        "name": "Sodium",
        "category": "alkali_metal",
        "number": 11,
        "x": 1,
        "y": 3,
        "symbol": "Na"
    },
    "2_3": {
        "name": "Magnesium",
        "category": "alkaline_earth_metal",
        "number": 12,
        "x": 2,
        "y": 3,
        "symbol": "Mg"
    },
    "13_3": {
        "name": "Aluminium",
        "category": "post_transition_metal",
        "number": 13,
        "x": 13,
        "y": 3,
        "symbol": "Al"
    },
    "14_3": {
        "name": "Silicon",
        "category": "metalloid",
        "number": 14,
        "x": 14,
        "y": 3,
        "symbol": "Si"
    },
    "15_3": {
        "name": "Phosphorus",
        "category": "polyatomic_nonmetal",
        "number": 15,
        "x": 15,
        "y": 3,
        "symbol": "P"
    },
    "16_3": {
        "name": "Sulfur",
        "category": "polyatomic_nonmetal",
        "number": 16,
        "x": 16,
        "y": 3,
        "symbol": "S"
    },
    "17_3": {
        "name": "Chlorine",
        "category": "halogen",
        "number": 17,
        "x": 17,
        "y": 3,
        "symbol": "Cl"
    },
    "18_3": {
        "name": "Argon",
        "category": "noble_gas",
        "number": 18,
        "x": 18,
        "y": 3,
        "symbol": "Ar"
    },
    "1_4": {
        "name": "Potassium",
        "category": "alkali_metal",
        "number": 19,
        "x": 1,
        "y": 4,
        "symbol": "K"
    },
    "2_4": {
        "name": "Calcium",
        "category": "alkaline_earth_metal",
        "number": 20,
        "x": 2,
        "y": 4,
        "symbol": "Ca"
    },
    "3_4": {
        "name": "Scandium",
        "category": "transition_metal",
        "number": 21,
        "x": 3,
        "y": 4,
        "symbol": "Sc"
    },
    "4_4": {
        "name": "Titanium",
        "category": "transition_metal",
        "number": 22,
        "x": 4,
        "y": 4,
        "symbol": "Ti"
    },
    "5_4": {
        "name": "Vanadium",
        "category": "transition_metal",
        "number": 23,
        "x": 5,
        "y": 4,
        "symbol": "V"
    },
    "6_4": {
        "name": "Chromium",
        "category": "transition_metal",
        "number": 24,
        "x": 6,
        "y": 4,
        "symbol": "Cr"
    },
    "7_4": {
        "name": "Manganese",
        "category": "transition_metal",
        "number": 25,
        "x": 7,
        "y": 4,
        "symbol": "Mn"
    },
    "8_4": {
        "name": "Iron",
        "category": "transition_metal",
        "number": 26,
        "x": 8,
        "y": 4,
        "symbol": "Fe"
    },
    "9_4": {
        "name": "Cobalt",
        "category": "transition_metal",
        "number": 27,
        "x": 9,
        "y": 4,
        "symbol": "Co"
    },
    "10_4": {
        "name": "Nickel",
        "category": "transition_metal",
        "number": 28,
        "x": 10,
        "y": 4,
        "symbol": "Ni"
    },
    "11_4": {
        "name": "Copper",
        "category": "transition_metal",
        "number": 29,
        "x": 11,
        "y": 4,
        "symbol": "Cu"
    },
    "12_4": {
        "name": "Zinc",
        "category": "transition_metal",
        "number": 30,
        "x": 12,
        "y": 4,
        "symbol": "Zn"
    },
    "13_4": {
        "name": "Gallium",
        "category": "post_transition_metal",
        "number": 31,
        "x": 13,
        "y": 4,
        "symbol": "Ga"
    },
    "14_4": {
        "name": "Germanium",
        "category": "metalloid",
        "number": 32,
        "x": 14,
        "y": 4,
        "symbol": "Ge"
    },
    "15_4": {
        "name": "Arsenic",
        "category": "metalloid",
        "number": 33,
        "x": 15,
        "y": 4,
        "symbol": "As"
    },
    "16_4": {
        "name": "Selenium",
        "category": "polyatomic_nonmetal",
        "number": 34,
        "x": 16,
        "y": 4,
        "symbol": "Se"
    },
    "17_4": {
        "name": "Bromine",
        "category": "halogen",
        "number": 35,
        "x": 17,
        "y": 4,
        "symbol": "Br"
    },
    "18_4": {
        "name": "Krypton",
        "category": "noble_gas",
        "number": 36,
        "x": 18,
        "y": 4,
        "symbol": "Kr"
    },
    "1_5": {
        "name": "Rubidium",
        "category": "alkali_metal",
        "number": 37,
        "x": 1,
        "y": 5,
        "symbol": "Rb"
    },
    "2_5": {
        "name": "Strontium",
        "category": "alkaline_earth_metal",
        "number": 38,
        "x": 2,
        "y": 5,
        "symbol": "Sr"
    },
    "3_5": {
        "name": "Yttrium",
        "category": "transition_metal",
        "number": 39,
        "x": 3,
        "y": 5,
        "symbol": "Y"
    },
    "4_5": {
        "name": "Zirconium",
        "category": "transition_metal",
        "number": 40,
        "x": 4,
        "y": 5,
        "symbol": "Zr"
    },
    "5_5": {
        "name": "Niobium",
        "category": "transition_metal",
        "number": 41,
        "x": 5,
        "y": 5,
        "symbol": "Nb"
    },
    "6_5": {
        "name": "Molybdenum",
        "category": "transition_metal",
        "number": 42,
        "x": 6,
        "y": 5,
        "symbol": "Mo"
    },
    "7_5": {
        "name": "Technetium",
        "category": "transition_metal",
        "number": 43,
        "x": 7,
        "y": 5,
        "symbol": "Tc"
    },
    "8_5": {
        "name": "Ruthenium",
        "category": "transition_metal",
        "number": 44,
        "x": 8,
        "y": 5,
        "symbol": "Ru"
    },
    "9_5": {
        "name": "Rhodium",
        "category": "transition_metal",
        "number": 45,
        "x": 9,
        "y": 5,
        "symbol": "Rh"
    },
    "10_5": {
        "name": "Palladium",
        "category": "transition_metal",
        "number": 46,
        "x": 10,
        "y": 5,
        "symbol": "Pd"
    },
    "11_5": {
        "name": "Silver",
        "category": "transition_metal",
        "number": 47,
        "x": 11,
        "y": 5,
        "symbol": "Ag"
    },
    "12_5": {
        "name": "Cadmium",
        "category": "transition_metal",
        "number": 48,
        "x": 12,
        "y": 5,
        "symbol": "Cd"
    },
    "13_5": {
        "name": "Indium",
        "category": "post_transition_metal",
        "number": 49,
        "x": 13,
        "y": 5,
        "symbol": "In"
    },
    "14_5": {
        "name": "Tin",
        "category": "post_transition_metal",
        "number": 50,
        "x": 14,
        "y": 5,
        "symbol": "Sn"
    },
    "15_5": {
        "name": "Antimony",
        "category": "metalloid",
        "number": 51,
        "x": 15,
        "y": 5,
        "symbol": "Sb"
    },
    "16_5": {
        "name": "Tellurium",
        "category": "metalloid",
        "number": 52,
        "x": 16,
        "y": 5,
        "symbol": "Te"
    },
    "17_5": {
        "name": "Iodine",
        "category": "halogen",
        "number": 53,
        "x": 17,
        "y": 5,
        "symbol": "I"
    },
    "18_5": {
        "name": "Xenon",
        "category": "noble_gas",
        "number": 54,
        "x": 18,
        "y": 5,
        "symbol": "Xe"
    },
    "1_6": {
        "name": "Cesium",
        "category": "alkali_metal",
        "number": 55,
        "x": 1,
        "y": 6,
        "symbol": "Cs"
    },
    "2_6": {
        "name": "Barium",
        "category": "alkaline_earth_metal",
        "number": 56,
        "x": 2,
        "y": 6,
        "symbol": "Ba"
    },
    "3_9": {
        "name": "Lanthanum",
        "category": "transition_metal",
        "number": 57,
        "x": 3,
        "y": 9,
        "symbol": "La"
    },
    "4_9": {
        "name": "Cerium",
        "category": "lanthanide",
        "number": 58,
        "x": 4,
        "y": 9,
        "symbol": "Ce"
    },
    "5_9": {
        "name": "Praseodymium",
        "category": "lanthanide",
        "number": 59,
        "x": 5,
        "y": 9,
        "symbol": "Pr"
    },
    "6_9": {
        "name": "Neodymium",
        "category": "lanthanide",
        "number": 60,
        "x": 6,
        "y": 9,
        "symbol": "Nd"
    },
    "7_9": {
        "name": "Promethium",
        "category": "lanthanide",
        "number": 61,
        "x": 7,
        "y": 9,
        "symbol": "Pm"
    },
    "8_9": {
        "name": "Samarium",
        "category": "lanthanide",
        "number": 62,
        "x": 8,
        "y": 9,
        "symbol": "Sm"
    },
    "9_9": {
        "name": "Europium",
        "category": "lanthanide",
        "number": 63,
        "x": 9,
        "y": 9,
        "symbol": "Eu"
    },
    "10_9": {
        "name": "Gadolinium",
        "category": "lanthanide",
        "number": 64,
        "x": 10,
        "y": 9,
        "symbol": "Gd"
    },
    "11_9": {
        "name": "Terbium",
        "category": "lanthanide",
        "number": 65,
        "x": 11,
        "y": 9,
        "symbol": "Tb"
    },
    "12_9": {
        "name": "Dysprosium",
        "category": "lanthanide",
        "number": 66,
        "x": 12,
        "y": 9,
        "symbol": "Dy"
    },
    "13_9": {
        "name": "Holmium",
        "category": "lanthanide",
        "number": 67,
        "x": 13,
        "y": 9,
        "symbol": "Ho"
    },
    "14_9": {
        "name": "Erbium",
        "category": "lanthanide",
        "number": 68,
        "x": 14,
        "y": 9,
        "symbol": "Er"
    },
    "15_9": {
        "name": "Thulium",
        "category": "lanthanide",
        "number": 69,
        "x": 15,
        "y": 9,
        "symbol": "Tm"
    },
    "16_9": {
        "name": "Ytterbium",
        "category": "lanthanide",
        "number": 70,
        "x": 16,
        "y": 9,
        "symbol": "Yb"
    },
    "17_9": {
        "name": "Lutetium",
        "category": "lanthanide",
        "number": 71,
        "x": 17,
        "y": 9,
        "symbol": "Lu"
    },
    "4_6": {
        "name": "Hafnium",
        "category": "transition_metal",
        "number": 72,
        "x": 4,
        "y": 6,
        "symbol": "Hf"
    },
    "5_6": {
        "name": "Tantalum",
        "category": "transition_metal",
        "number": 73,
        "x": 5,
        "y": 6,
        "symbol": "Ta"
    },
    "6_6": {
        "name": "Tungsten",
        "category": "transition_metal",
        "number": 74,
        "x": 6,
        "y": 6,
        "symbol": "W"
    },
    "7_6": {
        "name": "Rhenium",
        "category": "transition_metal",
        "number": 75,
        "x": 7,
        "y": 6,
        "symbol": "Re"
    },
    "8_6": {
        "name": "Osmium",
        "category": "transition_metal",
        "number": 76,
        "x": 8,
        "y": 6,
        "symbol": "Os"
    },
    "9_6": {
        "name": "Iridium",
        "category": "transition_metal",
        "number": 77,
        "x": 9,
        "y": 6,
        "symbol": "Ir"
    },
    "10_6": {
        "name": "Platinum",
        "category": "transition_metal",
        "number": 78,
        "x": 10,
        "y": 6,
        "symbol": "Pt"
    },
    "11_6": {
        "name": "Gold",
        "category": "transition_metal",
        "number": 79,
        "x": 11,
        "y": 6,
        "symbol": "Au"
    },
    "12_6": {
        "name": "Mercury",
        "category": "transition_metal",
        "number": 80,
        "x": 12,
        "y": 6,
        "symbol": "Hg"
    },
    "13_6": {
        "name": "Thallium",
        "category": "post_transition_metal",
        "number": 81,
        "x": 13,
        "y": 6,
        "symbol": "Tl"
    },
    "14_6": {
        "name": "Lead",
        "category": "post_transition_metal",
        "number": 82,
        "x": 14,
        "y": 6,
        "symbol": "Pb"
    },
    "15_6": {
        "name": "Bismuth",
        "category": "post_transition_metal",
        "number": 83,
        "x": 15,
        "y": 6,
        "symbol": "Bi"
    },
    "16_6": {
        "name": "Polonium",
        "category": "metalloid",
        "number": 84,
        "x": 16,
        "y": 6,
        "symbol": "Po"
    },
    "17_6": {
        "name": "Astatine",
        "category": "halogen",
        "number": 85,
        "x": 17,
        "y": 6,
        "symbol": "At"
    },
    "18_6": {
        "name": "Radon",
        "category": "noble_gas",
        "number": 86,
        "x": 18,
        "y": 6,
        "symbol": "Rn"
    },
    "1_7": {
        "name": "Francium",
        "category": "alkali_metal",
        "number": 87,
        "x": 1,
        "y": 7,
        "symbol": "Fr"
    },
    "2_7": {
        "name": "Radium",
        "category": "alkaline_earth_metal",
        "number": 88,
        "x": 2,
        "y": 7,
        "symbol": "Ra"
    },
    "3_10": {
        "name": "Actinium",
        "category": "transition_metal",
        "number": 89,
        "x": 3,
        "y": 10,
        "symbol": "Ac"
    },
    "4_10": {
        "name": "Thorium",
        "category": "actinide",
        "number": 90,
        "x": 4,
        "y": 10,
        "symbol": "Th"
    },
    "5_10": {
        "name": "Protactinium",
        "category": "actinide",
        "number": 91,
        "x": 5,
        "y": 10,
        "symbol": "Pa"
    },
    "6_10": {
        "name": "Uranium",
        "category": "actinide",
        "number": 92,
        "x": 6,
        "y": 10,
        "symbol": "U"
    },
    "7_10": {
        "name": "Neptunium",
        "category": "actinide",
        "number": 93,
        "x": 7,
        "y": 10,
        "symbol": "Np"
    },
    "8_10": {
        "name": "Plutonium",
        "category": "actinide",
        "number": 94,
        "x": 8,
        "y": 10,
        "symbol": "Pu"
    },
    "9_10": {
        "name": "Americium",
        "category": "actinide",
        "number": 95,
        "x": 9,
        "y": 10,
        "symbol": "Am"
    },
    "10_10": {
        "name": "Curium",
        "category": "actinide",
        "number": 96,
        "x": 10,
        "y": 10,
        "symbol": "Cm"
    },
    "11_10": {
        "name": "Berkelium",
        "category": "actinide",
        "number": 97,
        "x": 11,
        "y": 10,
        "symbol": "Bk"
    },
    "12_10": {
        "name": "Californium",
        "category": "actinide",
        "number": 98,
        "x": 12,
        "y": 10,
        "symbol": "Cf"
    },
    "13_10": {
        "name": "Einsteinium",
        "category": "actinide",
        "number": 99,
        "x": 13,
        "y": 10,
        "symbol": "Es"
    },
    "14_10": {
        "name": "Fermium",
        "category": "actinide",
        "number": 100,
        "x": 14,
        "y": 10,
        "symbol": "Fm"
    },
    "15_10": {
        "name": "Mendelevium",
        "category": "actinide",
        "number": 101,
        "x": 15,
        "y": 10,
        "symbol": "Md"
    },
    "16_10": {
        "name": "Nobelium",
        "category": "actinide",
        "number": 102,
        "x": 16,
        "y": 10,
        "symbol": "No"
    },
    "17_10": {
        "name": "Lawrencium",
        "category": "actinide",
        "number": 103,
        "x": 17,
        "y": 10,
        "symbol": "Lr"
    },
    "4_7": {
        "name": "Rutherfordium",
        "category": "transition_metal",
        "number": 104,
        "x": 4,
        "y": 7,
        "symbol": "Rf"
    },
    "5_7": {
        "name": "Dubnium",
        "category": "transition_metal",
        "number": 105,
        "x": 5,
        "y": 7,
        "symbol": "Db"
    },
    "6_7": {
        "name": "Seaborgium",
        "category": "transition_metal",
        "number": 106,
        "x": 6,
        "y": 7,
        "symbol": "Sg"
    },
    "7_7": {
        "name": "Bohrium",
        "category": "transition_metal",
        "number": 107,
        "x": 7,
        "y": 7,
        "symbol": "Bh"
    },
    "8_7": {
        "name": "Hassium",
        "category": "transition_metal",
        "number": 108,
        "x": 8,
        "y": 7,
        "symbol": "Hs"
    },
    "9_7": {
        "name": "Meitnerium",
        "category": "transition_metal",
        "number": 109,
        "x": 9,
        "y": 7,
        "symbol": "Mt"
    },
    "10_7": {
        "name": "Darmstadtium",
        "category": "transition_metal",
        "number": 110,
        "x": 10,
        "y": 7,
        "symbol": "Ds"
    },
    "11_7": {
        "name": "Roentgenium",
        "category": "transition_metal",
        "number": 111,
        "x": 11,
        "y": 7,
        "symbol": "Rg"
    },
    "12_7": {
        "name": "Copernicium",
        "category": "transition_metal",
        "number": 112,
        "x": 12,
        "y": 7,
        "symbol": "Cn"
    },
    "13_7": {
        "name": "Nihonium",
        "category": "post_transition_metal",
        "number": 113,
        "x": 13,
        "y": 7,
        "symbol": "Nh"
    },
    "14_7": {
        "name": "Flerovium",
        "category": "post_transition_metal",
        "number": 114,
        "x": 14,
        "y": 7,
        "symbol": "Fl"
    },
    "15_7": {
        "name": "Moscovium",
        "category": "post_transition_metal",
        "number": 115,
        "x": 15,
        "y": 7,
        "symbol": "Mc"
    },
    "16_7": {
        "name": "Livermorium",
        "category": "post_transition_metal",
        "number": 116,
        "x": 16,
        "y": 7,
        "symbol": "Lv"
    },
    "17_7": {
        "name": "Tennessine",
        "category": "halogen",
        "number": 117,
        "x": 17,
        "y": 7,
        "symbol": "Ts"
    },
    "18_7": {
        "name": "Oganesson",
        "category": "noble_gas",
        "number": 118,
        "x": 18,
        "y": 7,
        "symbol": "Og"
    }
}

/* --- src/example-component.js --- */
/**
 * Example component.
 */
Example.DrawComponent = {
    ext_lang: 'periodic_table_component',
    formats: ['format_periodic_table_component_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new Example.DrawWindow(sandbox);
    }
};

Example.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.periodicTable = new Example.PeriodicTable(this.sandbox.container);
    this.periodicTable.init();
    this.recieveData = function (data) {
        console.log("in recieve data" + data);
    };

    var scElements = {};

    function drawAllElements() {
        var dfd = new jQuery.Deferred();
       // for (var addr in scElements) {
            jQuery.each(scElements, function(j, val){
                var obj = scElements[j];
                if (!obj || obj.translated) return;
// check if object is an arc
                if (obj.data.type & sc_type_arc_pos_const_perm) {
                    var begin = obj.data.begin;
                    var end = obj.data.end;
                    // logic for component update should go here
                }

        });
        SCWeb.ui.Locker.hide();
        dfd.resolve();
        return dfd.promise();
    }

// resolve keynodes
    var self = this;
    this.needUpdate = false;
    this.requestUpdate = function () {
        var updateVisual = function () {
// check if object is an arc
            var dfd1 = drawAllElements();
            dfd1.done(function (r) {
                return;
            });


/// @todo: Don't update if there are no new elements
            window.clearTimeout(self.structTimeout);
            delete self.structTimeout;
            if (self.needUpdate)
                self.requestUpdate();
            return dfd1.promise();
        };
        self.needUpdate = true;
        if (!self.structTimeout) {
            self.needUpdate = false;
            SCWeb.ui.Locker.show();
            self.structTimeout = window.setTimeout(updateVisual, 1000);
        }
    }
    
    this.eventStructUpdate = function (added, element, arc) {
        window.sctpClient.get_arc(arc).done(function (r) {
            var addr = r[1];
            window.sctpClient.get_element_type(addr).done(function (t) {
                var type = t;
                var obj = new Object();
                obj.data = new Object();
                obj.data.type = type;
                obj.data.addr = addr;
                if (type & sc_type_arc_mask) {
                    window.sctpClient.get_arc(addr).done(function (a) {
                        obj.data.begin = a[0];
                        obj.data.end = a[1];
                        scElements[addr] = obj;
                        self.requestUpdate();
                    });
                }
            });
        });
    };
// delegate event handlers
    this.sandbox.eventDataAppend = $.proxy(this.receiveData, this);
    this.sandbox.eventStructUpdate = $.proxy(this.eventStructUpdate, this);
    this.sandbox.updateContent();
};
SCWeb.core.ComponentManager.appendComponentInitialize(Example.DrawComponent);


