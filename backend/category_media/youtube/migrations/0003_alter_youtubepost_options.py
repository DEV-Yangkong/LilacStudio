# Generated by Django 4.2.2 on 2023-08-22 04:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("youtube", "0002_alter_youtubepost_video_url"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="youtubepost",
            options={"ordering": ["-created_at"]},
        ),
    ]
