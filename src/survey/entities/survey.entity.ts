import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('survey') // Nombre de la tabla en la base de datos
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ name: 'phone_number', nullable: false })
  phoneNumber: string;

  @Column({ name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ name: 'preferred_language', nullable: false })
  preferredLanguage: string;

  @Column({ name: 'how_found', nullable: false })
  howFound: string;

  @Column({ name: 'newsletter_subscription', nullable: true })
  newsletterSubscription: boolean;

  // Puedes agregar más columnas según sea necesario para otros campos de la encuesta

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
