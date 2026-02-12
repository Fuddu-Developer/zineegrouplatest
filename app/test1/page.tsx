'use client'

import Image from 'next/image'
import styles from './logo-variants.module.css'

const LOGO_SRC = '/assets/images/Logo-Helloans.png'
const VARIANTS = [
  { id: 'pulse', title: 'Pulse / breathing', className: styles.pulse },
  { id: 'spin', title: 'Spin / rotate', className: styles.spin },
  { id: 'glow', title: 'Glow / shadow', className: styles.glow },
  { id: 'float', title: 'Float / bounce', className: styles.float },
  { id: 'reveal', title: 'Fade in / shimmer', className: styles.reveal },
  { id: 'tilt', title: '3D tilt (hover)', className: styles.tilt },
] as const

export default function Test1Page() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Logo design & animation variants</h1>
      <p className={styles.subtitle}>6 possible effects on the logo image</p>

      <div className={styles.grid}>
        {VARIANTS.map((v) => (
          <div key={v.id} className={styles.card}>
            <span className={styles.cardTitle}>{v.title}</span>
            <div className={`${styles.logoBox} ${v.className}`}>
              <Image
                src={LOGO_SRC}
                alt="Logo"
                width={160}
                height={80}
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
