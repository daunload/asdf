export function Footer() {
	return (
		<footer className="bg-background-dark/80 border-t border-white/5 py-12 px-6 backdrop-blur-md">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
				<div className="flex items-center gap-3">
					<span className="material-symbols-outlined text-accent-gold text-2xl">
						auto_awesome
					</span>
					<span className="font-extrabold text-lg text-white">
						CosmicAI
					</span>
				</div>
				<div className="flex gap-8 text-white/40 text-sm">
					<a className="hover:text-white transition-colors" href="#">
						Privacy Policy
					</a>
					<a className="hover:text-white transition-colors" href="#">
						Terms of Service
					</a>
					<a className="hover:text-white transition-colors" href="#">
						Contact Support
					</a>
				</div>
				<div className="flex gap-4">
					<div className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/60 hover:text-white">
						<span className="material-symbols-outlined text-xl">
							public
						</span>
					</div>
				</div>
			</div>
			<p className="text-center text-white/20 text-xs mt-8">
				©2024 CosmicAI. Your data is encrypted and secure.
			</p>
		</footer>
	);
}
