# Generated by Django 4.2.2 on 2023-08-18 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("notice_board", "0002_notice_image_notice_video_url"),
    ]

    operations = [
        migrations.AddField(
            model_name="notice",
            name="image_url",
            field=models.URLField(blank=True, null=True),
        ),
    ]
