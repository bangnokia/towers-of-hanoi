var app = new Vue({
	el: '#app',
	data: {
		number: 5,
		towers: [[], [], []],
		disks: [],
	},
	mounted() {
		this.init();
	},
	computed: {
		width() {
			return this.number * 20;
		}
	},
	methods: {
		init() {
			this.towers = [[], [],[]];
			this.disks = [];
			for (let i = this.number; i >0; i--) {
				this.towers[0].push(i);
			}
			this.makeDisks();
		},
		async start() {
			this.init();
			await this.sleep();
			this.tower(this.number, this.towers[0], this.towers[1], this.towers[2]);
		},
		async tower(n, a, b, c) {
			if (n === 1) {
				b.push(a.pop());
				this.makeDisks();
			} else {
				await this.tower(n-1, a, c, b);
				await this.sleep();
				await this.tower(1, a, b, c);
				await this.sleep();
				await this.tower(n-1, c, b, a)
			}
		},
		sleep(ms) {
			ms = ms || 500;
			return new Promise(resolve => setTimeout(resolve, ms));
		},
		makeDisks() {
			var tmp = [];
			let cols = 0;
			while (cols < 3) {
				for (let i = 0; i < this.number; i++) {
					tmp.push(this.towers[cols][i] || 0);
				}
				cols++;
			}

			this.disks = tmp;
		},

		style(i, index) {
			let column = Math.floor(index / this.number);
			let w = i * 40;
			return {
				width: w + 'px',
				bottom: (index % this.number) * 20 + 'px',
				left: 40 * column * this.number + (this.number * 40 - w)/2 + 'px'
			}
		}
	},
	watch: {
		'number': async function (value, oldValue) {
			this.init();
			await this.sleep();
		}
	},
});
