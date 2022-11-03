<script>
	import { desktopList } from '$lib/devices';
</script>

<div class="scale row jbetween acenter">
	<p class="grow nowrap">Scale {desktopList[0].name}%</p>

	<button
		class="col fcenter"
		title="Window view with no scaling"
	>
		<img src="/expand.svg" alt="Expand" />
	</button>
</div>

<style lang="scss">
	.scale {
		position: absolute;
		inset: auto auto 0 auto;
		width: 150px;
		height: 40px;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-bottom: none;
		border-radius: 10px 10px 0 0;
		z-index: 1;

		p {
			color: var(--color-sec);
			font-weight: bold;
			font-size: 14px;
			padding: 0 14px;
			pointer-events: none;
		}

		button {
			cursor: pointer;
			width: 40px;
			height: 100%;
			box-shadow: -1px 0 0 var(--color-border);
			padding: 0;

			&:hover {
				transform: none;

				img {
					transform: scale(0.95);
				}
			}

			img {
				width: 15px;
				transition: 200ms;
			}
		}

		@media (max-width: 940px) {
			p {
				text-align: center;
			}

			button {
				display: none;
			}
		}
	}
</style>
