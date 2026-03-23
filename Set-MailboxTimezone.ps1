# Set-MailboxTimezone.ps1
# Endrer tidssonen til en eller flere Exchange Online-postbokser
# Krever: ExchangeOnlineManagement-modul og Global Admin / Exchange Admin

#Requires -Modules ExchangeOnlineManagement

[CmdletBinding(SupportsShouldProcess)]
param (
    # En enkelt e-postadresse
    [Parameter(Mandatory = $false)]
    [string]$Mailbox,

    # Kommaseparert liste med e-postadresser, eller sti til .txt-fil (én adresse per linje)
    [Parameter(Mandatory = $false)]
    [string]$MailboxList,

    # Tidssone-ID (Windows-format). Kjør Get-TimeZone -ListAvailable for gyldige verdier.
    # Eksempel: "W. Europe Standard Time" (Oslo/Stockholm/Berlin)
    [Parameter(Mandatory = $true)]
    [string]$TimeZone,

    # Logg resultater til denne filen (valgfritt)
    [Parameter(Mandatory = $false)]
    [string]$LogFile
)

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$timestamp] [$Level] $Message"
    Write-Host $line
    if ($LogFile) {
        Add-Content -Path $LogFile -Value $line
    }
}

# ---------------------------------------------------------------------------
# Valider tidssone
# ---------------------------------------------------------------------------
try {
    $tz = [System.TimeZoneInfo]::FindSystemTimeZoneById($TimeZone)
    Write-Log "Tidssone validert: $($tz.DisplayName)"
} catch {
    Write-Error "Ugyldig tidssone-ID: '$TimeZone'. Kjor 'Get-TimeZone -ListAvailable' for gyldige verdier."
    exit 1
}

# ---------------------------------------------------------------------------
# Koble til Exchange Online
# ---------------------------------------------------------------------------
Write-Log "Kobler til Exchange Online..."
try {
    Connect-ExchangeOnline -ShowBanner:$false
    Write-Log "Tilkoblet Exchange Online."
} catch {
    Write-Error "Feil ved tilkobling til Exchange Online: $_"
    exit 1
}

# ---------------------------------------------------------------------------
# Bygg liste over postbokser som skal oppdateres
# ---------------------------------------------------------------------------
$mailboxes = [System.Collections.Generic.List[string]]::new()

if ($Mailbox) {
    $mailboxes.Add($Mailbox)
}

if ($MailboxList) {
    if (Test-Path $MailboxList) {
        Get-Content $MailboxList | Where-Object { $_ -match '@' } | ForEach-Object {
            $mailboxes.Add($_.Trim())
        }
    } else {
        # Behandle som kommaseparert streng
        $MailboxList -split ',' | ForEach-Object {
            $mailboxes.Add($_.Trim())
        }
    }
}

if ($mailboxes.Count -eq 0) {
    Write-Error "Ingen postbokser angitt. Bruk -Mailbox eller -MailboxList."
    Disconnect-ExchangeOnline -Confirm:$false
    exit 1
}

Write-Log "Antall postbokser som skal oppdateres: $($mailboxes.Count)"

# ---------------------------------------------------------------------------
# Oppdater tidssone for hver postboks
# ---------------------------------------------------------------------------
$success = 0
$failed  = 0

foreach ($mb in $mailboxes) {
    try {
        if ($PSCmdlet.ShouldProcess($mb, "Sett tidssone til '$TimeZone'")) {
            Set-MailboxRegionalConfiguration -Identity $mb -TimeZone $TimeZone -ErrorAction Stop
            Write-Log "OK: $mb -> $TimeZone"
            $success++
        }
    } catch {
        Write-Log "FEIL: $mb - $_" -Level "ERROR"
        $failed++
    }
}

# ---------------------------------------------------------------------------
# Oppsummering
# ---------------------------------------------------------------------------
Write-Log "---------------------------------------------"
Write-Log "Fullfort. Vellykkede: $success  |  Feilet: $failed"
Write-Log "---------------------------------------------"

Disconnect-ExchangeOnline -Confirm:$false
Write-Log "Koblet fra Exchange Online."
