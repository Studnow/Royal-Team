<?php
// Получаем данные таблицы из аргументов
$table_data = isset( $args['table'] ) ? $args['table'] : [];
?>

<div class="overflow-x-auto">
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<?php if ( ! empty( $table_data['thead'] ) ) : ?>
					<?php foreach ( $table_data['thead'] as $header ) : ?>
						<th><?php echo esc_html( $header['text'] ); ?></th>
					<?php endforeach; ?>
				<?php endif; ?>
			</tr>
		</thead>
		<tbody>
			<?php if ( ! empty( $table_data['tbody'] ) ) : ?>
				<?php foreach ( $table_data['tbody'] as $row ) : ?>
					<tr>
						<?php if ( ! empty( $row['th'] ) ) : ?>
							<th><?php echo esc_html( $row['th'] ); ?></th>
						<?php endif; ?>
						<?php if ( ! empty( $row['td'] ) ) : ?>
							<?php foreach ( $row['td'] as $cell ) : ?>
								<td><?php echo esc_html( $cell ); ?></td>
							<?php endforeach; ?>
						<?php endif; ?>
					</tr>
				<?php endforeach; ?>
			<?php endif; ?>
		</tbody>
	</table>
</div>