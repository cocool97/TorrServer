import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { AddItemIcon, TorrentIcon } from 'icons'
import TextField from '@material-ui/core/TextField'
import { Cancel as CancelIcon } from '@material-ui/icons'
import { useState } from 'react'

import {
  CancelIconWrapper,
  IconWrapper,
  LeftSide,
  LeftSideBottomSectionFileSelected,
  LeftSideBottomSectionNoFile,
  LeftSideTopSection,
  TorrentIconWrapper,
} from './style'

export default function LeftSideComponent({
  setIsUserInteractedWithPoster,
  setSelectedFile,
  torrentSource,
  setTorrentSource,
  selectedFile,
}) {
  const { t } = useTranslation()

  const handleCapture = files => {
    const [file] = files
    if (!file) return

    setIsUserInteractedWithPoster(false)
    setSelectedFile(file)
    setTorrentSource(file.name)
  }

  const clearSelectedFile = () => {
    setSelectedFile()
    setTorrentSource('')
  }

  const [isTorrentSourceActive, setIsTorrentSourceActive] = useState(false)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleCapture, accept: '.torrent' })

  const handleTorrentSourceChange = ({ target: { value } }) => setTorrentSource(value)

  return (
    <LeftSide>
      <LeftSideTopSection active={isTorrentSourceActive}>
        <TextField
          onChange={handleTorrentSourceChange}
          value={torrentSource}
          margin='dense'
          label={t('TorrentSourceLink')}
          helperText={t('TorrentSourceOptions')}
          type='text'
          fullWidth
          onFocus={() => setIsTorrentSourceActive(true)}
          onBlur={() => setIsTorrentSourceActive(false)}
          inputProps={{ autoComplete: 'off' }}
          disabled={!!selectedFile}
        />
      </LeftSideTopSection>

      {selectedFile ? (
        <LeftSideBottomSectionFileSelected>
          <TorrentIconWrapper>
            <TorrentIcon />

            <CancelIconWrapper onClick={clearSelectedFile}>
              <CancelIcon />
            </CancelIconWrapper>
          </TorrentIconWrapper>
        </LeftSideBottomSectionFileSelected>
      ) : (
        <LeftSideBottomSectionNoFile isDragActive={isDragActive} {...getRootProps()}>
          <input {...getInputProps()} />
          <div>{t('AppendFile.Or')}</div>

          <IconWrapper>
            <AddItemIcon color='primary' />
            <div>{t('AppendFile.ClickOrDrag')}</div>
          </IconWrapper>
        </LeftSideBottomSectionNoFile>
      )}
    </LeftSide>
  )
}