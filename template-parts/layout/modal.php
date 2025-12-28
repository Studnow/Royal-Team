<!-- Open the modal using ID.showModal() method -->
<!-- <button class="btn" onclick="my_modal_1.showModal()">open modal</button> -->
<?php
$modal = $args['modal'] ?? [];
?>

<dialog id="<?php echo esc_attr( $modal['id'] ?? 'custom-modal' ); ?>" class="modal">
	<div class="modal-box">
		<?php
		// Подключаем заголовок секции
		get_template_part( 'template-parts/components/simple/section-title', null, [ 
			'heading' => $modal['heading'] ?? 'Заголовок модалки',
		] );
		?>

		<div class="modal-body">
			<?php
			if ($modal['body']['form'] ) {
				get_template_part( 'template-parts/components/complex/dForm', null, [ 
					'dynForm_data' => $modal['body']['modalForm']['form_2']
				] );
			}
			?>
		</div>

		<div class="modal-action">
			<button onclick="document.getElementById('<?php echo esc_attr( $modal['id'] ?? 'custom-modal' ); ?>').close()"
				class="btn btn-primary">Close no form</button>
		</div>
	</div>
</dialog>