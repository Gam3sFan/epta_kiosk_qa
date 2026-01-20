!macro customInit
  ; Ensure the app is not running before install/update
  nsExec::ExecToLog 'taskkill /IM Epta_Kiosk_QA.exe /F'

  ; Attempt to remove previous installation silently
  ClearErrors
  ReadRegStr $0 HKLM "${INSTALL_REGISTRY_KEY}" "InstallLocation"
  ${If} $0 == ""
    ReadRegStr $0 HKCU "${INSTALL_REGISTRY_KEY}" "InstallLocation"
  ${EndIf}

  ${If} $0 != ""
    StrCpy $1 "$0\\${UNINSTALL_FILENAME}"
    IfFileExists "$1" 0 +3
      ExecWait '"$1" /S /KEEP_APP_DATA'
      Sleep 1000
    RMDir /r "$0"
  ${EndIf}
!macroend

!macro customUnInstall
  ; Ensure the app is not running before uninstall
  nsExec::ExecToLog 'taskkill /IM Epta_Kiosk_QA.exe /F'
!macroend
