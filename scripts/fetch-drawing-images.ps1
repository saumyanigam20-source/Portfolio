$ErrorActionPreference = "Stop"
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
$space = "4e211403-3635-8174-8482-0003654575cd"
$root = "public/images/illustrations"

function Get-NotionUrl($attachment, $block) {
  $encoded = $attachment.Replace(":", "%3A")
  return "https://worried-swim-808.notion.site/image/attachment%3A${encoded}?table=block&id=$block&spaceId=$space&width=1400&userId=&cache=v2"
}

$files = @(
  @{ out = "$root/icon-library/01.png"; a = "a55f23b8-f3f5-4e8a-8f36-a723122e53f5:b59aff27-65c6-4711-b3bb-536edf1ab897.png"; b = "2f311403-3635-804e-a344-ed24033213ce" },
  @{ out = "$root/icon-library/02.png"; a = "8d1fb8b1-4ed6-40ed-ae3f-9a7177579f47:image.png"; b = "2f311403-3635-8061-9e2b-c8058ee9ac98" },
  @{ out = "$root/icon-library/03.png"; a = "4079c6fb-9ae0-4ef5-8ba5-8bd1166f3405:image.png"; b = "2f311403-3635-80b6-8eec-cce288b72393" },
  @{ out = "$root/icon-library/04.png"; a = "b7a3f517-f52e-4f44-ab15-f9ffcbd769df:image.png"; b = "2f311403-3635-80e8-8fb2-d8555b611118" },
  @{ out = "$root/icon-library/05.png"; a = "4f6a08e4-197c-444e-9e0e-c9675241eca4:Frame_9034.png"; b = "2f311403-3635-80e7-bce9-f7d758d2b4ce" },
  @{ out = "$root/customs/sketch-01.png"; a = "f0d90b6d-255a-4316-9b9e-2eb9d4c57bb3:ChatGPT_Image_Jan_26_2026_12_16_57_PM.png"; b = "2f411403-3635-8066-ba15-d9e9f16eb19f" },
  @{ out = "$root/customs/sketch-02.png"; a = "b9061353-9d01-4ea1-ab96-c5984c6db220:ChatGPT_Image_Jan_26_2026_12_38_17_PM.png"; b = "2f411403-3635-8041-b0ed-c05d571129a1" },
  @{ out = "$root/customs/final-01.png"; a = "8a0f53ae-6661-48a7-85e3-f47b9a461660:Screenshot_2026-01-26_at_12.47.34_PM.png"; b = "2f411403-3635-8056-b52a-c7107c6e128c" },
  @{ out = "$root/customs/final-02.png"; a = "bbf1815f-1e34-40f7-89b4-2b69c3c5875d:Screenshot_2026-01-26_at_12.48.01_PM.png"; b = "2f411403-3635-80fc-97aa-f0b054f20288" },
  @{ out = "$root/customs/final-03.png"; a = "169dc679-4742-4b24-afaf-c1d6c8084c40:Screenshot_2026-01-26_at_12.48.57_PM.png"; b = "2f411403-3635-800f-9214-e5ef1d158efc" },
  @{ out = "$root/mental-health/nurturing-cover.png"; a = "7fddb10c-dc4b-4b47-b598-a0e79a0c198f:Screenshot_2026-01-25_at_9.40.47_PM.png"; b = "2f311403-3635-8081-902b-c8e2441331db" },
  @{ out = "$root/mental-health/growing.png"; a = "eca0f777-3516-42b0-8284-333fa2dd0bf0:Screenshot_2026-01-25_at_9.34.47_PM.png"; b = "2f311403-3635-80d9-9b50-c8814e409772" },
  @{ out = "$root/mental-health/nurturing.png"; a = "87f2c2d1-1fef-4320-82f8-f38e145cd60d:Screenshot_2026-01-25_at_9.36.00_PM.png"; b = "2f311403-3635-80cd-b732-ef217d86eb70" },
  @{ out = "$root/mental-health/site-01.png"; a = "655ecf97-9c0f-408e-9668-069161f6f157:Screenshot_2026-01-25_at_9.39.02_PM.png"; b = "2f311403-3635-800c-88a6-c613412bac32" },
  @{ out = "$root/mental-health/site-02.png"; a = "22934c39-fb1e-444c-b1c1-3aa72df5668a:Screenshot_2026-01-25_at_9.39.30_PM.png"; b = "2f311403-3635-8033-819c-f11698b14278" },
  @{ out = "$root/mental-health/site-03.png"; a = "0c86700c-bf58-47a7-a418-3583fb0458f5:Screenshot_2026-01-25_at_9.40.01_PM.png"; b = "2f311403-3635-80d1-bb24-dd8361c00bef" },
  @{ out = "$root/social/walls-01.png"; a = "cc8ba402-9f4d-430f-85a8-bc5a343cac36:1.png"; b = "2f411403-3635-8098-b911-c90f841ea3d4" },
  @{ out = "$root/social/walls-02.png"; a = "b960cff8-97c9-4d3e-b993-26dce641ccd2:2.png"; b = "2f411403-3635-8088-aa9b-ddb22c6b3e90" },
  @{ out = "$root/social/walls-03.png"; a = "d91894d3-15aa-462e-87e4-3960f8f66383:3.png"; b = "2f411403-3635-8071-b4dc-f3e837d5e30e" },
  @{ out = "$root/social/walls-04.png"; a = "50a8dbdb-4d1b-41be-9876-9adc7db18b8d:4.png"; b = "2f411403-3635-80a1-9ece-fc6e7929f93b" },
  @{ out = "$root/social/rooted-01.png"; a = "f61709d4-c572-48db-8661-192953721b38:Screenshot_2026-01-26_at_6.38.36_PM.png"; b = "2f411403-3635-801d-a2e2-c5824dc68539" },
  @{ out = "$root/social/rooted-02.png"; a = "a88d7ef2-9752-4927-9ae5-53a8338557ff:Screenshot_2026-01-26_at_6.39.02_PM.png"; b = "2f411403-3635-8036-9327-ea437e07bc0f" },
  @{ out = "$root/social/rooted-03.png"; a = "700e6d69-c520-4ac9-9c4d-c41ee9282774:Screenshot_2026-01-26_at_6.39.21_PM.png"; b = "2f411403-3635-80c1-8202-ed6025671e19" },
  @{ out = "$root/social/rooted-04.png"; a = "4857a6ee-6c88-491c-bdec-e30953b81d0b:Screenshot_2026-01-26_at_6.39.36_PM.png"; b = "2f411403-3635-80e8-b7c0-cb2091807465" }
)

foreach ($dir in @("icon-library", "customs", "mental-health", "social")) {
  New-Item -ItemType Directory -Force -Path (Join-Path $root $dir) | Out-Null
}

foreach ($file in $files) {
  $url = Get-NotionUrl $file.a $file.b
  curl.exe -fsSL -A $ua -o $file.out $url
  if ($LASTEXITCODE -ne 0) { throw "Failed $($file.out)" }
  $len = (Get-Item $file.out).Length
  Write-Output "$($file.out) $len"
}

Copy-Item "$root/social/walls-02.png" "$root/social.png" -Force
Write-Output "done"
